import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ChatComponent} from './chat.component';
import {Title} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    Title
  ],
  exports: [ChatComponent]
})

export class ChatModule {}
