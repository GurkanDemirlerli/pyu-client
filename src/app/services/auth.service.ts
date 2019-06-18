import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private domain = server.url + "/";
  public userInfo: any;
  constructor(private http:HttpClient) { }

  login(){
    const credentials = {
      email: "gurkan@example.com",
      password: "Password123."
    }
    return this.http.post<any>(this.domain + 'users/login', credentials)
    .pipe(
        tap((res) => {
            this.storeUserData(res.data.token,res.data.userInfo);
            this.userInfo = res.data.userInfo;
        }),
    );
  }

  private storeUserData(token: string, userInfo) {
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

}
