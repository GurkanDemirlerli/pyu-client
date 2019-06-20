import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private domain = server.url + "/api/";
  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http.get<any>(this.domain + `projects/${id}`);
  }

  getMembers(id:number){
    return this.http.get<any>(this.domain + `projects/${id}/members`);
  }

}
