import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProfileEditorComponent} from './profileEditor.component';
import {ProfileEditorRoutingModule} from './profile-editor-routing.module';

@NgModule({
  declarations: [
    ProfileEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ProfileEditorRoutingModule
  ],
  exports: [ProfileEditorComponent]
})

export class ProfileEditorModule {}
