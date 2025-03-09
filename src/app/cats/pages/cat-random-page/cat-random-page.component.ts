import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cat-random-page',
  imports: [],
  templateUrl: './cat-random-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CatRandomPageComponent { }
