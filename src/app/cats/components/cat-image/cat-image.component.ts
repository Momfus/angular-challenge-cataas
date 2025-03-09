import { Component, inject, input } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Cat } from '../../interfaces/cats.interface';
import { ModalCatService } from 'src/app/shared/services/modal-cat.service';

@Component({
  selector: 'app-cat-image-card',
  imports: [LazyLoadImageModule],
  template: `
    <div class="overflow-hidden w-[200px] h-[200px] rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.05]">

    <img
        [lazyLoad]="catData()?.imageUrl ?? 'assets/cat-image-placeholder-loading.jpg'"
        [defaultImage]="'assets/cat-image-placeholder-loading.jpg'"
        [errorImage]="'assets/cat-image-placeholder-error.jpg'"
        [alt]="(catData()?.tags || []).join(', ')"
        class="w-full h-full object-cover cursor-pointer"
        (click)="onImageClick()"
      />

    </div>
  `,
})
export class CatImageCardComponent {

  modalCatService = inject(ModalCatService);

  catData = input<Cat | null>(null);

  onImageClick() {
    this.modalCatService.openModal(
      this.catData()
    );
  }

}
