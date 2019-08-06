import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})

export class WorkspaceService {
    private domain = server.url + "/api/";
    constructor(private http: HttpClient) { }

    getSharedWorkspaces() {
        return this.http.get<any>(this.domain + `workspaces`);
    }

}
