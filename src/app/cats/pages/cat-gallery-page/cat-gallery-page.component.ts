import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SpinnerLoadingComponent } from 'src/app/shared/components/spinner-loading/spinner-loading.component';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';
import { CatImageCardComponent } from '../../components/cat-image/cat-image.component';

@Component({
  selector: 'app-cat-gallery-page',
  imports: [LazyLoadImageModule, SpinnerLoadingComponent, CatImageCardComponent],
  templateUrl: './cat-gallery-page.component.html'
})
export default class CatGalleryPageComponent implements OnInit, AfterViewInit {

  private catsService = inject(CatsService);
  private scrollStateService = inject(ScrollStateService)

  isLoading = signal<boolean>(false);
  modalImage = signal<string | null>(null);
  scrollDivRef = viewChild<ElementRef>('groupDiv');

  cats = this.catsService.cats;

  ngOnInit(): void {
    if (this.cats().length === 0) {
      this.loadCats();
    }
  }

  ngAfterViewInit(): void {

    this.setScrollState();

  }

  setScrollState() {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if( !scrollDiv ) {
      return;
    }

    scrollDiv.scrollTop = this.scrollStateService.catGalleryScrollState();
  }

  loadCats() {
    if( this.isLoading() ) return;
    this.isLoading.set(true);
    this.catsService.getCats().subscribe({
      next: () => this.isLoading.set(false),
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  onScroll() {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if( !scrollDiv ) {
      return;
    }

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = (scrollTop + clientHeight + 100) >= scrollHeight;

    this.scrollStateService.catGalleryScrollState.set(scrollTop);

    if( isAtBottom) {
      this.loadCats();
    }
  }

}
