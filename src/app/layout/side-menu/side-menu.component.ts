import { SubjectService } from './../../services/subject.service';
import { DomainService } from './../../services/domain.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
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
  faTasks,
  faSearch

} from '@fortawesome/free-solid-svg-icons';
import { ITreeOptions } from 'angular-tree-component';
import { SubjectTypes } from '../../enums';
import { of } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})

export class SideMenuComponent implements OnInit {
  @ViewChild('tree', { static: true }) tree;

  nodes = [
  ];

  options: ITreeOptions = {
    allowDrag: (node) => node.data.subjectType !== SubjectTypes.DOMAIN,
    allowDrop: (element, { parent, index }) => {
      if (parent.parent === null)
        return false;
      return true;
    },
    idField: 'subjectId',
    displayField: 'name',
    getChildren: this.getChildren.bind(this),
  };

  data = [];

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
    faTasks,
    faSearch
  }
  constructor(private domainService: DomainService, private subjectService: SubjectService) { }

  name = 'Angular';
  public items = [
      { name: 'John', otherProperty: 'Foo' },
      { name: 'Joe', otherProperty: 'Bar' }
  ];

  ngOnInit() {
    //HARD-CODING getActiveDomains(3)
    this.nodes = [];
    let nds = [];
    this.domainService.getActiveDomains(3).subscribe((res) => {
      console.log(res.data);
      (res.data as any[]).map((root) => {
        nds.push({
          ...root,
          hasChildren: true
        });
      });
      this.nodes = nds;
    });
  }

  @ViewChild(ContextMenuComponent, { static: true }) public basicMenu: ContextMenuComponent;

  showMessage(message: any) {
    console.log(message);
  }

  toggleExpanded(node) {
    if (node.isCollapsed)
      node.expand();
    else
      node.collapse();
  }


  onEvent(e) {
    // if (!e.node.data.isFetched) {
    //   this.subjectService.getDescendantsTree(e.node.data.subjectId).subscribe((res) => {
    //     e.node.data.isFetched = true;
    //     console.log(res.data);
    //     let subFolds = res.data.filter(sbj => sbj.subjectType === SubjectTypes.FOLDER || sbj.subjectType === SubjectTypes.PROJECT);
    //     console.log(subFolds);
    //     let tr = this.addChildrensToFolders(e.node.data.subjectId, subFolds);
    //     console.log("NESTED:", tr);
    //     let node = this.nodes.find(x => x.subjectId === e.node.data.subjectId);
    //     node.children = tr;
    //     let others = this.nodes.filter(x => x.subjectId !== e.node.data.subjectId);
    //     this.nodes = [...others, node];
    //   });
    // }

    // console.log(e);
  }

  addChildrensToFolders(parentId, arr) {
    var out = []
    for (var i in arr) {
      if (arr[i].parentId == parentId) {
        var children = this.addChildrensToFolders(arr[i].subjectId, arr)

        if (children.length) {
          arr[i].children = children;
        }
        out.push(
          arr[i]
        )
      }
    }
    return out;
  }


  // asyncChildren = [
  //   {
  //     name: 'child1',
  //     hasChildren: true
  //   }, {
  //     name: 'child2'
  //   }
  // ];

  getChildren(node: any) {
    return new Promise((resolve, reject) => {
      this.subjectService.getDescendantsTree(node.data.subjectId).subscribe((res) => {
        let subFolds = res.data.filter(sbj => sbj.subjectType === SubjectTypes.FOLDER || sbj.subjectType === SubjectTypes.PROJECT);
        let tr = this.addChildrensToFolders(node.data.subjectId, subFolds);
        resolve(tr);
      });
    });

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => resolve(newNodes), 1000);
    // });
  }

}
