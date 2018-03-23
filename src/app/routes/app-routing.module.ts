import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateViaAuthGuard} from '../services/guards/CanActivateViaAuthGuard';



const routes: Routes = [
      {
        path: 'users', 
        loadChildren: 'app/components/users/users.module#UsersModule',
        canActivate:[CanActivateViaAuthGuard]
      },
      {
        path:'',
        loadChildren:'app/components/login/login.module#LoginModule'
      }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}