import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import {
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})

export class SideMenuComponent implements OnInit {
  @Output() onAddFolderSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild(ContextMenuComponent, { static: true }) public basicMenu: ContextMenuComponent;

  nodesValue: any[];
  @Output()
  nodesChange = new EventEmitter<any[]>();
  @Input()
  get nodes() {
    return this.nodesValue;
  }
  set nodes(val) {
    this.nodesValue = val;
    this.nodesChange.emit(this.nodesValue);
  }

  @Output() onNodeMove = new EventEmitter<any>();
  @Output() onActivate = new EventEmitter<any>();

  @Input() options: ITreeOptions;

  icons = {
    faSearch
  }

  constructor(
  ) { }

  ngOnInit() {

  }
  toggleExpanded(node) {
    if (node.isCollapsed)
      node.expand();
    else
      node.collapse();
  }

  handleAddFolderSelect(e) {
    this.onAddFolderSelect.emit(e);
  }

  handleNodeMove(e) {
    this.onNodeMove.emit(e);
  }

}
