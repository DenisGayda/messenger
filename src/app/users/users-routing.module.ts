import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from "./users.component";
import { CanActivateViaAuthGuard } from '../CanActivateViaAuthGuard';
import { ChatComponent } from '../chat/chat.component';
import { NgModule } from '@angular/core';


const USERS_ROUTER: Routes = [
    { 
        path: '',
        component: UsersComponent,
        canActivate: [CanActivateViaAuthGuard], 
        children:[
            {
                path:'chat/:id',
                loadChildren:'app/chat/chat.module#ChatModule'
            }
        ]
        // 
    }
    // 
];

@NgModule({
    imports: [RouterModule.forChild(USERS_ROUTER)],
    exports: [RouterModule]
  })
  export class UsersRoutingModule { }