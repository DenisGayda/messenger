import {ChatComponent} from '../components/chat/chat.component';
import {UsersComponent} from '../components/users/users.component';
import {LoginComponent} from '../components/login/login.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanActivateViaAuthGuard} from '../services/guards/CanActivateViaAuthGuard';

const routes: Routes = [
  {
    path: 'users', component: UsersComponent,
    canActivate: [CanActivateViaAuthGuard],
    children: [
      {
        path: 'chat/:id', component: ChatComponent,
        canActivate: [CanActivateViaAuthGuard]
      }
    ]
  },
  {path: '', component: LoginComponent}
];

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
export class MyRoutesModule {
}
