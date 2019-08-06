import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { LoginCredentialsModel } from '../models/login-credentials.model';
@Injectable({
    providedIn: 'root'
})

export class AccountService {
    private domain = server.url + "/api/";
    constructor(private http: HttpClient) { }

    login(credentials: LoginCredentialsModel) {
        return this.http.post<any>(this.domain + 'accounts/login', credentials)
            .pipe(
                tap((res) => {
                    this.storeUserData(res.data.token, res.data.userInfo);
                }),
            );
    }

    private storeUserData(token: string, userInfo) {
        localStorage.setItem('token', token);
    }

    logout() {
        //TODO serverda logout yap logla
        localStorage.clear();
    }

}
