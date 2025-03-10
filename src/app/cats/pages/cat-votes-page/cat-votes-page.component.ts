import { Component, DestroyRef, effect, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import { Cat } from '../../interfaces/cats.interface';
import { CatImageCardComponent } from "../../components/cat-image/cat-image.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cat-votes-page',
  imports: [CatImageCardComponent],
  templateUrl: './cat-votes-page.component.html',
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


  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
