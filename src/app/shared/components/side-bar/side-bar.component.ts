import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent { }
