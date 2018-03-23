import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateViaAuthGuard} from '../services/guards/CanActivateViaAuthGuard';
import {CanLoadViaAuthGuard} from '../services/guards/CanLoadViaAuthGuard';


const routes: Routes = [
      {
        path: 'users', 
        loadChildren: 'app/components/users/users.module#UsersModule',
        // canActivate:[CanActivateViaAuthGuard],
        canLoad:[CanLoadViaAuthGuard]
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
  ],
  providers: [
    CanLoadViaAuthGuard,
    // CanActivateViaAuthGuard
  ]
})
export class AppRoutingModule {
}