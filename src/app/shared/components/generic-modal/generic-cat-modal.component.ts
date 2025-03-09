import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, Output, inject, signal } from '@angular/core';
import { ModalCatService } from '../../services/modal-cat.service';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CatsService } from 'src/app/cats/services/cats.service';

@Component({
  selector: 'app-generic-cat-modal',
  imports: [CommonModule, LazyLoadImageModule],
  templateUrl: './generic-cat-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericCatModalComponent implements OnInit {
  close = Output();

  modalCatService = inject(ModalCatService);
  catService = inject(CatsService);

  voteCount = signal<number>(0);
  canRemove = signal<boolean>(false);


  ngOnInit(): void {
    const catId = this.modalCatService.catData()?.id;

    const votes = this.catService.getCatVotes(catId) ?? 0;

    this.voteCount.set(votes);

    this.canRemove.set(!!this.catService.getExistCatInList(catId));

  }

  onClose() {
    this.voteCount.set(0);
    this.canRemove.set(false);
    this.modalCatService.closeModal();
  }

  closeModalOutsideClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (targetElement.id === 'modal-overlay') {
      this.onClose();
    }
  }

  incrementVote() {
    this.voteCount.update(v => v + 1);
    this._uploadVote();
  }

  decrementVote() {
    if (this.voteCount() > 0) {
      this.voteCount.update(v => v - 1);
      this._uploadVote();
    }
  }

  private _uploadVote() {
    const catData = this.modalCatService.catData();
    if (!catData) {
      return;
    }

    this.catService.updateCatVote(catData, this.voteCount());
    this.canRemove.set(true);
  }

  removeFromVoteList() {
    const catData = this.modalCatService.catData();
    if (!catData) {
      return;
    }

    this.catService.removeCatVote(catData.id);
    this.canRemove.set(false);
    this.voteCount.set(0);
  }

}
