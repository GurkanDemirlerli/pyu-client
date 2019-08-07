import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})

export class WorkflowService {
    private domain = server.url + "/api/";
    constructor(private http: HttpClient) { }

    getActiveWorkflow(folderId: number) {
        return this.http.get<any>(this.domain + `workflows/getActiveWorkflow/${folderId}`);
    }

}
