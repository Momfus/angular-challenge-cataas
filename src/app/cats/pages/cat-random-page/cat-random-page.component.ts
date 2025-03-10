import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import { CatImageCardComponent } from "../../components/cat-image/cat-image.component";
import { Cat } from '../../interfaces/cats.interface';

@Component({
  selector: 'app-cat-random-page',
  imports: [CatImageCardComponent],
  templateUrl: './cat-random-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CatRandomPageComponent implements OnInit {

  catsService = inject(CatsService);
  currentCat = signal<Cat | null>(null)

  ngOnInit() {
    this.generateRandomCat();
  }

  generateRandomCat() {
    this.catsService.getRandomCat().subscribe({
      next: cat => {
        this.currentCat.set(cat);
      },
      error: err => {
        console.error(err);
      }
    });
  }


}
