import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from "./users.component";
import { CanActivateViaAuthGuard } from '../CanActivateViaAuthGuard';
import { ChatComponent } from '../chat/chat.component';
import { NgModule } from '@angular/core';


const USERS_ROUTER: Routes = [
    { 
        path: '',
        component: UsersComponent,

        children:[
            {
                path:'chat/:id',
                loadChildren:'app/chat/chat.module#ChatModule'
            }
        ]
        // canActivate: [CanActivateViaAuthGuard]
    }
    // 
];

@NgModule({
    imports: [RouterModule.forChild(USERS_ROUTER)],
    exports: [RouterModule]
  })
  export class UsersRoutingModule { }