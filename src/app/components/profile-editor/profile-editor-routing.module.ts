import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProfileEditorComponent} from './profileEditor.component';

const PROFILE_EDITOR_ROUTER: Routes = [
  {
    path: '',
    component: ProfileEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(PROFILE_EDITOR_ROUTER)],
  exports: [RouterModule]
})
export class ProfileEditorRoutingModule {
}
