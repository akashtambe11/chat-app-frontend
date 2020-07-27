import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Component
import { UserComponent } from './components/user/user.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { VerifyAccountComponent } from './components/user/verify-account/verify-account.component';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: '', component: UserComponent,
    children: [
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
      { path: 'verify/:token', component: VerifyAccountComponent },
      { path: 'reset/:token', component: ResetPasswordComponent },
      
    ]
  },

  {path: 'dashboard', component: ChatComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
