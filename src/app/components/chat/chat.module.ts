import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ChatComponent} from './chat.component';
import {StoreService} from '../../services/store/store.service';
import {DbService} from '../../services/db/db.service';
import {Title} from '@angular/platform-browser';
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
  providers: [
    StoreService,
    DbService,
    Title
  ],
  exports: [ChatComponent]
})

export class ChatModule {}
