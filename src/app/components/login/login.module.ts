import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoginRoutingModule
  ]
})

export class LoginModule {}
