import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { DomainService } from '../../services/domain.service';
import { SubjectService } from '../../services/subject.service';
import { ITreeOptions } from 'angular-tree-component';
import { SubjectTypes } from 'src/app/enums';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'pyu-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  //#region Props
  public selectedMenuSubject;
  public workspaceId: number;
  public selectedFolderId: number;
  public selectedFolderAncestors;
  public nodes = [];
  public style: object = {};
  public display = {
    addFolderForm: false
  };

  public options: ITreeOptions = {
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


  public brItems: any[] = [];
  public tabItems: any[];
  public activeTabItem;

  public selectedFolder

  //#endregion

  constructor(
    private route: ActivatedRoute,
    private domainService: DomainService,
    private subjectService: SubjectService,
    private router: Router
  ) { }

  //#region Life Cycle

  ngOnInit() {
    this.route.params.pipe().subscribe(routeParams => {
      console.log(routeParams);
      this.workspaceId = routeParams.id;
      console.log(this.workspaceId);
      this.fetchNodes();
    });

    this.tabItems = [
      { label: 'Kanban', route: 'kanban', icon: 'far fa-clipboard' },
      { label: 'Table', route: 'table', icon: 'fas fa-table' },
      { label: 'Gantt', route: 'gantt', icon: 'fa fa-stream' },
      { label: 'TimeLog', route: 'timelog', icon: 'fas fa-history' },
      { label: 'Analytics', route: 'analytics', icon: 'fas fa-chart-line' }
    ];

    this.route.firstChild.params.pipe().subscribe(routeParams => {
      console.log(routeParams);
      if (routeParams.folderId !== undefined) {
        this.selectedFolderId = routeParams.folderId;
        console.log(this.selectedFolderId);
        this.subjectService.getAncestorsTree(this.selectedFolderId).subscribe((res) => {
          this.selectedFolderAncestors = this.populateAncestors(res.data);
          console.log("ANCESTOR TREE", this.selectedFolderAncestors);
          this.updateBreadCrumbs();
        });
      }
    });

    // this.activeTabItem = this.tabItems[0];
  }

  //#endregion


  //#region Handlers

  handleResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    this.style = {
      width: `${event.rectangle.width}px`,
    };
  }

  handleAddFolderSelect(e) {
    this.selectedMenuSubject = e.item.data;
    this.display = { ...this.display, addFolderForm: true };
  }

  handleNodeMove(e) {
    console.log(e);
    this.subjectService.move(e.node.subjectId, e.to.parent.subjectId).subscribe((res) => {
    });
  }

  handleSubjectAdded(e) {
    for (let i in this.nodes) {
      if (this.nodes[i].subjectId == e.parentId) {
        if (!this.nodes[i].children)
          this.nodes[i].children = [];
        this.nodes[i].children = [...this.nodes[i].children, e];
        this.nodes = [...this.nodes];
        console.log("found");
        break;
      }
      this.bindNewSubjectToParent(this.nodes[i], e);
    }
  }

  handleTabClick(e) {
    console.log(e);
    //HARD-CODING folder
    this.router.navigate([`/workspace/${this.workspaceId}/folder/1/${e.route}`])
  }
  //HARD-CODING kanban
  handleSubjectSelected(e) {
    this.router.navigate([`/workspace/${this.workspaceId}/folder/${e.node.data.subjectId}/kanban`])
  }

  //#endregion

  private fetchNodes() {
    let nds = [];
    this.domainService.getActiveDomains(this.workspaceId).subscribe((res) => {
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

  private getChildren(node: any) {
    return new Promise((resolve, reject) => {
      this.subjectService.getDescendantsTree(node.data.subjectId).subscribe((res) => {
        let subFolds = res.data.filter(sbj => sbj.subjectType === SubjectTypes.FOLDER || sbj.subjectType === SubjectTypes.PROJECT);
        let tr = this.addChildrensToFolders(node.data.subjectId, subFolds);
        resolve(tr);
      });
    });
  }

  private addChildrensToFolders(parentId, arr) {
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

  private bindNewSubjectToParent(root, newSubject: any) {
    for (let i in root.children) {
      if (root.children[i].subjectId == newSubject.parentId) {
        if (!root.children[i].children)
          root.children[i].children = [];
        root.children[i].children = [...root.children[i].children, newSubject];
        this.nodes = [...this.nodes];
        console.log("found");
        break;
      }
      this.bindNewSubjectToParent(root.children[i], newSubject);
    }
  }

  private populateAncestors(flatList) {
    let inProgress = true;
    let leaf;
    let root = (flatList as any[]).find(x => x.parentId == null);
    if (!root)
      return;
    leaf = root;
    while (inProgress) {
      let child = (flatList as any[]).find(x => x.parentId == leaf.subjectId);
      if (!child) {
        inProgress = false;
      } else {
        leaf.child = child;
        leaf = child;
      }
    }
    return root;
  }

  private updateBreadCrumbs() {
    let brItems = [];
    let inProgress = true;
    let node = this.selectedFolderAncestors;
    brItems.push({
      label: node.name,
      subjectId: node.subjectId
    });
    while (inProgress)
      if (node.child) {
        node = node.child;
        brItems.push({
          label: node.name,
          subjectId: node.subjectId
        });
      }
      else {
        inProgress = false;
      }
    this.brItems = [...brItems];
  }

  public validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }
}
