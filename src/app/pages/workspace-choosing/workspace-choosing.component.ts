import { WorkspaceService } from './../../services/workspace.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pyu-workspace-choosing',
  templateUrl: './workspace-choosing.component.html',
  styleUrls: ['./workspace-choosing.component.scss']
})
export class WorkspaceChoosingComponent implements OnInit {

  workspaces = [];
  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit() {
    this.workspaceService.getSharedWorkspaces().subscribe((res) => {
      this.workspaces = res.data;
    });
  }

}
