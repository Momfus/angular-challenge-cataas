import { Component, effect, inject, signal } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import { Cat } from '../../interfaces/cats.interface';
import { CatImageCardComponent } from "../../components/cat-image/cat-image.component";
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-cat-votes-page',
  imports: [CatImageCardComponent],
  templateUrl: './cat-votes-page.component.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export default class CatVotesPageComponent {


  catsService = inject(CatsService);
  private router = inject(Router);

  visibleCats = signal<Cat[]>([]);


  constructor() {

    // Effect to update the visible cats when the cat vote list changes
    effect(() => {
      this.visibleCats.set( this.catsService.catVoteList() );
    });

  }

  trackByCatId(index: number, cat: Cat): string {
    return cat.id;
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
