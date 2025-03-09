import { Component, Input, Output, EventEmitter, input, output } from '@angular/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-cat-image',
  imports: [LazyLoadImageModule],
  template: `
    <div class="overflow-hidden w-[200px] h-[200px] rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.05]">
      <img
        [lazyLoad]="imageUrl() ?? 'assets/cat-image-placeholder.jpg'"
        [defaultImage]="'assets/cat-image-placeholder.jpg'"
        [errorImage]="'assets/cat-image-placeholder.jpg'"
        [alt]="altText()"
        class="w-full h-full object-cover cursor-pointer"
        (click)="onImageClick()"
      />
    </div>
  `,
})
export class CatImageComponent {
  imageUrl = input< string | null>(null);
  altText = input<string>('');

  onImageClick() {
    console.log('OPEN MODAL');
  }
}
