import { Component, inject, OnInit, signal } from '@angular/core';
import { Cat } from '../../interfaces/cats.interface';
import { CatsService } from '../../services/cats.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SpinnerLoadingComponent } from 'src/app/shared/components/spinner-loading/spinner-loading.component';

@Component({
  selector: 'app-cat-gallery-page',
  imports: [LazyLoadImageModule, NgxSkeletonLoaderModule, SpinnerLoadingComponent],
  templateUrl: './cat-gallery-page.component.html'
})
export default class CatGalleryPageComponent implements OnInit {

  isLoading = signal<boolean>(false);
  modalImage = signal<string | null>(null);

  private catsService = inject(CatsService);

  cats = this.catsService.cats;

  ngOnInit(): void {
    if (this.cats().length === 0) {
      this.loadCats();
    }
  }

  loadCats() {
    this.isLoading.set(true);
    this.catsService.getCats().subscribe({
      next: () => this.isLoading.set(false),
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  openModal(imageUrl: string) {
    // this.modalImage.set(imageUrl);
    // console.log(imageUrl);
    this.loadCats();

  }

  closeModal() {
    // this.modalImage.set(null);
  }

  onScroll(event: Event ) {

  }

}
