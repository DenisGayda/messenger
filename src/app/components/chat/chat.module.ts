import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ChatComponent} from './chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ChatRoutingModule} from './chat-routing.module'


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ChatRoutingModule
  ],
  providers: [],
  exports: [ChatComponent]
})

export class ChatModule {}
