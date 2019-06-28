import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private domain = server.url + "/api/";

  public addedProject$: BehaviorSubject<any> = new BehaviorSubject(null);


  constructor(private http: HttpClient) { }

  public emitProjectAdded(newValue: any) {
    console.log("PROJECT ADDED",newValue);
    this.addedProject$.next(newValue);
  }

  get(id: number) {
    return this.http.get<any>(this.domain + `projects/${id}`);
  }

  getMembers(id: number) {
    return this.http.get<any>(this.domain + `projects/${id}/members`);
  }

  add(model: any) {
    return this.http.post<any>(this.domain + 'projects', model);
  }

}
