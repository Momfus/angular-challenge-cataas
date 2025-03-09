import { Component } from "@angular/core";

@Component({
   selector: "app-spinner",
   template: `
    <div class="flex flex-col items-center justify-center">
      <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500 mb-2" role="status"></div>
      <span class="text-blue-500">Loading...</span>
    </div>
   `,
   styles: [
      `
         .spinner-border {
            border-top-color: transparent;
         }
      `,
   ],
})
export class SpinnerLoadingComponent {}
