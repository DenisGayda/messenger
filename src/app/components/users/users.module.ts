import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UsersComponent} from './users.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UsersRoutingModule} from './users-routing.module';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UsersRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0QFcZaBbhdA6J_4DmE61W4bqwa93LmLU'
    })
  ],
  exports: [ UsersComponent ],
})

export class UsersModule {}
