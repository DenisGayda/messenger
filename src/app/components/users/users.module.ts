import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UsersComponent} from './users.component';
<<<<<<< HEAD
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UsersRoutingModule} from './users-routing.module'
=======
import {Title} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ChatModule} from '../chat/chat.module';
>>>>>>> master

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
<<<<<<< HEAD
    UsersRoutingModule
  ],
  exports: [ UsersComponent ],
=======
    FormsModule,
    ChatModule
  ],
  exports: [ UsersComponent ],
  providers: [
    Title
  ]
>>>>>>> master
})

export class UsersModule {}