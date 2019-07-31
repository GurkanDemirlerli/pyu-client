import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})

export class DomainService {
    private serverDomain = server.url + "/api/";
    constructor(private http: HttpClient) { }

    getActiveDomains(workspaceId: number) {
        return this.http.get<any>(this.serverDomain + `domains/activeDomains/${workspaceId}`);
    }

}
