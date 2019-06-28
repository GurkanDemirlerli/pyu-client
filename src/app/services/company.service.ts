import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private domain = server.url + "/api/";
  constructor(private http: HttpClient) { }


  addStatusTemplate(companyId: number, model: any) {
    return this.http.post<any>(this.domain + `companies/${companyId}/addStatusTemplate`, model);
  }

  getTree(companyId: number) {
    return this.http.get<any>(this.domain + `companies/${companyId}/showTree`);
  }

  getStatusTemplates(companyId:number){
    return this.http.get<any>(this.domain + `companies/${companyId}/statusTemplates`);
  }
  getMembers(companyId:number){
    return this.http.get<any>(this.domain + `companies/${companyId}/getMembers`);

  }
}
