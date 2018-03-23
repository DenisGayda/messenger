import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  providers: []
})

export class LoginModule {}
