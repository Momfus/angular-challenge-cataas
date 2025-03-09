import { Component } from '@angular/core';
import { SideBarComponent } from "../../../shared/components/side-bar/side-bar.component";
import { RouterOutlet } from '@angular/router';
import { GenericCatModalComponent } from "../../../shared/components/generic-modal/generic-cat-modal.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [SideBarComponent, RouterOutlet, GenericCatModalComponent],
  templateUrl: './dashboard-page.component.html',
  styles: [`
    .page-container {
      background-color: #FFFCE9;
    }
  `]
})
export default class DashboardPageComponent { }
