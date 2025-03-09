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
  cats = signal<Cat[]>([]);
  isLoading = signal<boolean>(false);
  modalImage = signal<string | null>(null);

  private skip = 0;
  private limit = 16;

  private catsService = inject(CatsService);

  ngOnInit(): void {
    this.loadCats();
  }

  loadCats() {
    this.isLoading.set(true);
    this.catsService.getCats(this.skip, this.limit).subscribe({
      next: (newCats) => {
        console.log(newCats);
        this.cats.update(current => [...current, ...newCats]);
        this.skip += this.limit;
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    })
  }

  openModal(imageUrl: string) {
    // this.modalImage.set(imageUrl);
    // console.log(imageUrl);
    this.loadCats();

  }

  closeModal() {
    // this.modalImage.set(null);
  }

}
