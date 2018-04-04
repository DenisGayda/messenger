import {NgModule} from '@angular/core';
import {ContextMenuComponent} from './context-menu.component';
import {MatListModule} from '@angular/material/list';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ContextMenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [ContextMenuComponent]
})

export class ContextMenuModule {
}
