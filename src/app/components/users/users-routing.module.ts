import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from "./users.component";
import {CanActivateViaAuthGuard} from '../../services/guards/CanActivateViaAuthGuard';
import {NgModule} from '@angular/core';


const USERS_ROUTER: Routes = [
    { 
        path: '',
        component: UsersComponent,
        // canLoad: [CanActivateViaAuthGuard], 
        children:[
            {
                path:'chat/:id',
                loadChildren:'app/components/chat/chat.module#ChatModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(USERS_ROUTER)],
    exports: [RouterModule]
  })
export class UsersRoutingModule { }