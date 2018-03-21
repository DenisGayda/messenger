import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {UsersComponent} from './users.component';
import {StoreService} from '../../services/store/store.service';
import {DbService} from '../../services/db/db.service';
import {Title} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [ UsersComponent ],
  providers: [
    StoreService,
    DbService,
    Title
  ]
})

export class UsersModule {}
