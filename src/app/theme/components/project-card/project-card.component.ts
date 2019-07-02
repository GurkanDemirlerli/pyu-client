import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import {
  faUsers,
  faQuestion,
  faExclamation,
  faExclamationTriangle, faBolt, faChevronDown, faComments, faCodeBranch, faClock, faChevronCircleDown, faChevronUp, faChevronCircleUp, faAngleDoubleUp, faAngleDoubleDown, faAngleUp, faAngleDown, faAngleRight, faColumns
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'pyu-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: any;
  @Output() onProjectSelected: EventEmitter<any> = new EventEmitter();
  @HostBinding('style.animation') anima = 'none';


  icons = {
    faBolt,
    faChevronDown,
    faComments,
    faCodeBranch,
    faClock,
    faColumns,
    faUsers,
    faQuestion,
    faExclamationTriangle,
    faExclamation
  }

  pricons = [faChevronCircleDown, faChevronDown, faAngleDoubleDown, faAngleDown, faAngleRight, faAngleUp, faAngleDoubleUp, faChevronUp, faChevronCircleUp];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // if (this.project.isNew) {
    //   this.anima = 'grow .6s';
    //   setTimeout(() => {
    //     this.anima = 'none';
    //   }, 3000);
    // }

  }

  selectProject() {
    this.onProjectSelected.emit(this.project);
  }

  navigateToProjectPage() {
    this.router.navigate(['/community/2/project/' + this.project.id]);
  }

}
