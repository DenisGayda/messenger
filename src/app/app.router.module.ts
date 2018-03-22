import {ChatComponent} from './chat/chat.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateViaAuthGuard} from './CanActivateViaAuthGuard';

const routes: Routes = [
      {
        path: 'users', 
        loadChildren: 'app/users/users.module#UsersModule'
      },
      {
        path:'',
        loadChildren:'app/login/login.module#LoginModule'
      }
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