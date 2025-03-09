import { ChangeDetectionStrategy, Component, Output, inject } from '@angular/core';
import { ModalCatService } from '../../services/modal-cat.service';

@Component({
  selector: 'app-generic-cat-modal',
  imports: [],
  templateUrl: './generic-cat-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericCatModalComponent {
  close = Output();

  modalCatService = inject(ModalCatService);

  closeModalOutsideClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (targetElement.id === 'modal-overlay') {
      this.modalCatService.closeModal();
    }
  }

}
