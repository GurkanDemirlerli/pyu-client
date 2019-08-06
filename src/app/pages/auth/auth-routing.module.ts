import { LogoutComponent } from './logout/logout.component';
import { ForgotPaswordComponent } from './forgot-pasword/forgot-pasword.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            }, {
                path: 'register',
                component: RegisterComponent
            }, {
                path: 'forgot-password',
                component: ForgotPaswordComponent,
            }, {
                path: 'logout',
                component: LogoutComponent,
            }]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
