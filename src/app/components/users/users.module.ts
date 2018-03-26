import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UsersComponent} from './users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UsersRoutingModule} from './users-routing.module'

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UsersRoutingModule,
    FormsModule
  ],
  exports: [ UsersComponent ],
})

export class UsersModule {}