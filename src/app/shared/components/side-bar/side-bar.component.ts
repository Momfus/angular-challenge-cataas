import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MenuOptions } from "../../../cats/interfaces/menu.interface";

@Component({
  selector: "app-side-bar",
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./side-bar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
  menuOptions: MenuOptions[] = [
    {
      path: "cats-gallery",
      name: "Cats Gallery",
      icon: "fas fa-cat",
    },
    {
      path: "cats-votes",
      name: "Cats Votes",
      icon: "fas fa-vote-yea",
    },
    {
      path: "cats-random",
      name: "Cats Random",
      icon: "fas fa-random",
    },
  ];
}
