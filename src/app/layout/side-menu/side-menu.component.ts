import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {
  faUserLock,
  faBuilding,
  faSchool,
  faMapMarkedAlt,
  faBookOpen,
  faAddressBook,
  faFeather,
  faAdjust,
  faHome,
  faProjectDiagram,
  faCalendarAlt,
  faUndoAlt,
  faUsers,
  faQuestion,
  faExclamationTriangle,
  faColumns,
  faTasks
} from '@fortawesome/free-solid-svg-icons';
import { MenuService } from '../services/menu.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [
    trigger('sideMenuAnime', [
      state('collapsed', style({ width: '55px' })),
      state('open', style({ width: '200px' })),
      state('hidden', style({ left: '-200px' })),
      transition('open => collapsed', animate('400ms ease-in')),
      transition('collapsed => open', animate('400ms ease-out')),
      transition('open => hidden', animate('400ms ease-out')),
      transition('hidden => open', animate('400ms ease-out'))
    ]),
    trigger('minilogoAnime', [
      state('open', style({ display: 'flex' })),
      state('collapsed', style({ display: 'none' })),
      state('hidden', style({ display: 'flex' })),

    ]),
    trigger('avatarAnime', [
      state('open', style({ width: '80px', height: '80px', display: 'flex' })),
      state('collapsed', style({ width: '0px', height: '0px', display: 'none' })),
      state('hidden', style({ display: 'flex' })),
      transition('open => collapsed', animate('400ms ease-in')),
      transition('collapsed => open', animate('400ms ease-out')),
    ]),
  ]
})

export class SideMenuComponent implements OnInit {
  isMax: boolean = false;
  menuState: string;
  isMobile: boolean;
  icons = {
    faUserLock,
    faBuilding,
    faSchool,
    faMapMarkedAlt,
    faBookOpen,
    faHome,
    faProjectDiagram,
    faCalendarAlt,
    faUndoAlt,
    faUsers,
    faQuestion,
    faExclamationTriangle,
    faAddressBook,
    faFeather,
    faAdjust,
    faColumns,
    faTasks
  }
  constructor(private menuService: MenuService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {

          this.isMobile = true;
          this.menuService.toggleMenuSize(false);
          this.isMax = false;
          this.menuState = 'hidden';
        } else {
          this.isMobile = false;
          this.menuService.toggleMenuSize(false);
          this.isMax = false;
          this.menuState = 'collapsed';
        }
      });


    this.menuService.isMax$.subscribe((menuState) => {
      this.isMax = menuState;
      if (this.isMobile)
        this.menuState = (this.isMax === true) ? 'open' : 'hidden';
      else
        this.menuState = (this.isMax === true) ? 'open' : 'collapsed';
    });
  }
  animationStart(_$event: any) {
    this.menuService.emitAnimationStart();
  }

}
