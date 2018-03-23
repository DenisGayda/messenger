<<<<<<< HEAD
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';
=======
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {Title} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
>>>>>>> master

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    LoginRoutingModule
  ]
})

export class LoginModule {}
=======
    FormsModule
  ],
  providers: [
    Title
  ]
})
export class LoginModule {
}
>>>>>>> master
