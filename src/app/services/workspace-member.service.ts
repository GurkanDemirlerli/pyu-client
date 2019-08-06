import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})

export class WorkspaceMemberService {
    private domain = server.url + "/api/";
    constructor(private http: HttpClient) { }

    getWorkspaceMembers(workspaceId: number) {
        return this.http.get<any>(this.domain + `workspace-members/getWorkspaceMembers/${workspaceId}`);
    }
}
