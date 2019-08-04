import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})

export class SubjectService {
    private serverDomain = server.url + "/api/";
    constructor(private http: HttpClient) { }

    getAncestorsTree(subjectId: number) {
        return this.http.get<any>(this.serverDomain + `subjects/ancestors/${subjectId}`);
    }

    getDescendantsTree(subjectId: number) {
        return this.http.get<any>(this.serverDomain + `subjects/descendants/${subjectId}`);
    }

    move(childId: number, parentId: number) {
        let model = {
            childId,
            parentId
        };
        return this.http.post<any>(this.serverDomain + 'subjects/move', model);
    }

}
