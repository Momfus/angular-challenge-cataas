import { ChangeDetectionStrategy, Component, OnInit, Output, inject, signal } from '@angular/core';
import { ModalCatService } from '../../services/modal-cat.service';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-generic-cat-modal',
  imports: [CommonModule, LazyLoadImageModule],
  templateUrl: './generic-cat-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericCatModalComponent implements OnInit {
  close = Output();

  modalCatService = inject(ModalCatService);

  voteCount = signal<number>(0);

  ngOnInit(): void {
    const votes = this.modalCatService.catData()?.votes ?? 0;
    this.voteCount.set(votes);
  }

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
