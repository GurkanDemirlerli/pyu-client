import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private domain = server.url + "/api/";
  constructor(private http: HttpClient) { }

  insert(model: any) {
    return this.http.post<any>(this.domain + `projects`, model);
  }

}
