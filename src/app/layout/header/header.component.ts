import { Component, OnInit } from '@angular/core';
import { faSignInAlt, faUserPlus, faBars, faSearch, faSignOutAlt, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
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
    trigger('headerToggle', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('open', style({ transform: 'rotate(180deg)' })),
      transition('open => collapsed', animate('400ms ease-in')),
      transition('collapsed => open', animate('400ms ease-out')),
    ])
  ]
})
export class HeaderComponent implements OnInit {
  headerIsOpen = false;
  isMax = true;
  menuState: string;
  headerState: string = 'collapsed';
  icons = {
    faSearch,
    faSignInAlt,
    faUserPlus,
    faBars,
    faSignOutAlt,
    faCaretSquareDown
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

  toggleHeader() {
    this.headerIsOpen = !this.headerIsOpen;
    this.headerState = (this.headerIsOpen === true) ? 'open' : 'collapsed';
  }

}
