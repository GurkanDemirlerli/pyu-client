import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { TaskFilter } from '../models/filters';
import { of, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  public addedTask$: BehaviorSubject<any> = new BehaviorSubject(null);

  private domain = server.url + "/api/";
  constructor(private http: HttpClient) { }

  public emitTaskAdded(newValue: any) {
    this.addedTask$.next(newValue);
  }

  add(model: any) {
    return this.http.post<any>(this.domain + 'tasks', model);
  }

  get(id: number) {
    return this.http.get<any>(this.domain + `tasks/${id}`);
  }

  getForStatus(parameters: TaskFilter) {
    const params = new HttpParams({
      fromObject: { ...parameters }
    });
    return this.http.get<any>(this.domain + 'tasks', { params: params });
  }

  changeStatus(taskId: number, statusId: number) {
    return this.http.put<any>(this.domain + `tasks/${taskId}/updateStatus`, { statusId: statusId })
  }


  // isMax = new BehaviorSubject<boolean>(false);
  // isMax$ = this.isMax.asObservable();
  // animationStart = new BehaviorSubject<boolean>(true);
  // animationStart$ = this.animationStart.asObservable();
  //
  // toggleMenuSize(size: boolean): void {
  //     this.isMax.next(size);
  // }
  //
  // emitAnimationStart():void{
  //     this.animationStart.next(!this.animationStart);
  // }
}
