import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { StoreService } from '../services/store/store.service';
import { DbService } from '../services/db/db.service';
import { Title } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UsersRoutingModule,
  ],
  exports: [ UsersComponent ],
  providers: [
    StoreService,
    DbService,
    Title
  ]
})

export class UsersModule {}
