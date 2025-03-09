import { Injectable, signal } from '@angular/core';
import { Cat } from 'src/app/cats/interfaces/cats.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalCatService {

  isOpen = signal(false);
  catData = signal<Cat | null>(null);

  openModal(data: Cat | null ) {
    if( !data ) {
      return;
    }

    this.catData.set(data);
    this.isOpen.set(true);
  }

  closeModal() {
    console.log(JSON.stringify('data'));

    this.isOpen.set(false);
    this.catData.set(null);
  }

}
