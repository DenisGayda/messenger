import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {UsersComponent} from './users.component';
import {Title} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ChatModule} from '../chat/chat.module';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ChatModule
  ],
  exports: [ UsersComponent ],
  providers: [
    Title
  ]
})

export class UsersModule {}
