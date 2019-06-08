import { Component, OnInit } from '@angular/core';
import { faSignInAlt, faUserPlus, faBars, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MenuService } from '../services/menu.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('menuToggle', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('open', style({ transform: 'rotate(90deg)' })),
      transition('open => collapsed', animate('400ms ease-in')),
      transition('collapsed => open', animate('400ms ease-out')),
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  isMax = true;
  menuState: string;
  icons = {
    faSearch,
    faSignInAlt,
    faUserPlus,
    faBars,
    faSignOutAlt
  }
  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit() {

  }

  toggleMenu() {
    let menuSize = this.menuService.isMax.value;
    console.log(menuSize);
    this.menuService.toggleMenuSize(!menuSize);

    this.menuService.isMax$.subscribe((menuState) => {
      this.isMax = menuState;
        this.menuState = (this.isMax === true) ? 'open' : 'collapsed';
    });
  }

}
