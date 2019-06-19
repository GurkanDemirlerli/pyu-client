import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { TaskFilter } from '../models/filters';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private domain = server.url + "/api/";
  constructor(private http: HttpClient) { }

  add(model: any) {
    return this.http.post<any>(this.domain + 'tasks', model);
  }

  getForStatus(parameters: TaskFilter) {
    const params = new HttpParams({
      fromObject: { ...parameters }
    });
    return this.http.post<any>(this.domain + 'tasks', { params: params });
  }


}
