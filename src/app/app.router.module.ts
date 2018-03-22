import {ChatComponent} from './chat/chat.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateViaAuthGuard} from './CanActivateViaAuthGuard';

// const routes: Routes = [
//   {
//     path: 'users', component: UsersComponent,
//     canActivate: [CanActivateViaAuthGuard],
//     children: [
//       {
//         path: 'chat/:id', component: ChatComponent,
//         canActivate: [CanActivateViaAuthGuard]
//       }
//     ]
//   },
//   {path: '', component: LoginComponent}
// ];
const routes: Routes = [
      {
        path: 'users', 
        loadChildren: 'app/users/users.module#UsersModule'
//         canActivate: [CanActivateViaAuthGuard]
      },
      {
        path:'',
        loadChildren:'app/login/login.module#LoginModule'
      },
      {
        path: 'orders',
        loadChildren: 'app/orders/orders.module#OrdersModule'
      },
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanActivateViaAuthGuard
  ]
})
export class AppRouterModule {
}