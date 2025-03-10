import { Component, inject, input } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Cat } from '../../interfaces/cats.interface';
import { ModalCatService } from 'src/app/shared/services/modal-cat.service';

@Component({
  selector: 'app-cat-image-card',
  imports: [LazyLoadImageModule],
  template: `
    <div class="relative overflow-hidden w-[200px] h-[200px] rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.05]">
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

  onImageClick() {
    this.modalCatService.openModal(
      this.catData()
    );
  }

}
