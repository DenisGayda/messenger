import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login.component";
import {NgModule} from '@angular/core';

const LOGIN_ROUTER: Routes = [
    { 
        path: '',
        component: LoginComponent,
        pathMatch:'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(LOGIN_ROUTER)],
    exports: [RouterModule]
  })
export class LoginRoutingModule { }

