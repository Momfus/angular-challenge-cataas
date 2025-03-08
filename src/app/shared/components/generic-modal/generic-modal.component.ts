import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  imports: [],
  templateUrl: './generic-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericModalComponent { }
