import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ChatComponent} from './chat.component';
<<<<<<< HEAD
=======
import {Title} from '@angular/platform-browser';
>>>>>>> master
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
<<<<<<< HEAD
    FormsModule,
    ChatRoutingModule
=======
    FormsModule
  ],
  providers: [
    Title
>>>>>>> master
  ],
  exports: [ChatComponent]
})

export class ChatModule {}