import { Component, inject, input } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Cat } from '../../interfaces/cats.interface';
import { ModalCatService } from 'src/app/shared/services/modal-cat.service';
import { CommonModule } from '@angular/common';


type CatImageSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-cat-image-card',
  imports: [LazyLoadImageModule, CommonModule],
  template: `
    <div
    [ngClass]="{
        'w-[200px] h-[200px]': size() === 'small',
        'w-[300px] h-[300px]': size() === 'medium',
        'w-[400px] h-[400px]': size() === 'large'
      }"
      class="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.05]">
      <img
        [lazyLoad]="catData()?.imageUrl ?? 'assets/cat-image-placeholder-loading.jpg'"
        [defaultImage]="'assets/cat-image-placeholder-loading.jpg'"
        [errorImage]="'assets/cat-image-placeholder-error.jpg'"
        [alt]="(catData()?.tags || []).join(', ')"
        class="w-full h-full object-cover cursor-pointer"
        (click)="onImageClick()"
      />

      @if(showOverlayVote() ) {
        <div class="absolute bottom-0 right-0 m-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {{ catData()?.votes ?? 0 }}
        </div>
      }
    </div>
  `,

})
export class CatImageCardComponent {

  modalCatService = inject(ModalCatService);

  catData = input<Cat | null>(null);
  showOverlayVote = input<boolean>(false);
  size = input<CatImageSize>('small');

  onImageClick() {
    this.modalCatService.openModal(
      this.catData()
    );
  }

}
