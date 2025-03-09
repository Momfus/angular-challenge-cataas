import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [],
  template: `
      <div class="flex flex-col items-center justify-center h-screen">
      <div class="text-yellow-500 text-9xl mb-4">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <div class="text-4xl text-gray-800 mb-4">404 Not Found</div>
      <button (click)="goToDashboard()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
        Go to Dashboard
      </button>
    </div>
  `,
})
export default class NotFoundPageComponent {

  private router = inject(Router)

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
