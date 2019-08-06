import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPaswordComponent } from './forgot-pasword/forgot-pasword.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPaswordComponent,
        LogoutComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [],
})
export class AuthModule { }
