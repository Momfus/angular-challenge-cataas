import { ChangeDetectionStrategy, Component, Output, inject, signal } from '@angular/core';
import { ModalCatService } from '../../services/modal-cat.service';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-generic-cat-modal',
  imports: [CommonModule, LazyLoadImageModule],
  templateUrl: './generic-cat-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericCatModalComponent {
  close = Output();

  modalCatService = inject(ModalCatService);

  voteCount = signal<number>(0);

  closeModalOutsideClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (targetElement.id === 'modal-overlay') {
      this.modalCatService.closeModal();
    }
  }

  incrementVote() {
    this.voteCount.update(v => v + 1);
  }

  decrementVote() {
    if (this.voteCount() > 0) {
      this.voteCount.update(v => v - 1);
    }
  }

}
