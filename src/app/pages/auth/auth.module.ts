import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPaswordComponent } from './forgot-pasword/forgot-pasword.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPaswordComponent
    ],
    imports: [
        AuthRoutingModule
    ],
    exports: [],
    providers: [],
})
export class AuthModule { }
