import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth/auth.service';
import { Title } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { loginRouter } from './login.router';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    loginRouter
  ],
  providers: [
    AuthService,
    Title
  ]
})

export class LoginModule {}
