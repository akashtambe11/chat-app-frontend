// Built-in imports
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Routing import
import { AppRoutingModule } from './app-routing.module';

// Component imports
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { VerifyAccountComponent } from './components/user/verify-account/verify-account.component';
import { HeaderComponent } from './components/user/navigation/header/header.component';
import { FooterComponent } from './components/user/navigation/footer/footer.component';
import { UserListComponent } from './components/chat/user-list/user-list.component';
import { GetMessageComponent } from './components/chat/get-message/get-message.component';
import { SendMessageComponent } from './components/chat/send-message/send-message.component';
import { ChatComponent } from './components/chat/chat.component';

// Services imports
import { TokenInterceptorService } from './services/token-interceptor.service'
import { SocketIoService } from './services/socket-io.service';

// Guard import
import { AuthGuard } from './auth.guard';

@NgModule({

  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    VerifyAccountComponent,
    HeaderComponent,
    FooterComponent,
    UserListComponent,
    GetMessageComponent,
    SendMessageComponent,
    ChatComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    SocketIoService,
    AuthGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
