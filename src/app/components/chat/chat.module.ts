import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ChatComponent} from './chat.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ChatRoutingModule} from './chatRouting.module';
import {ContextMenuModule} from './context-menu/context-menu.module';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ChatRoutingModule,
    ContextMenuModule
  ],
  exports: [ChatComponent]
})

export class ChatModule {}
