import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login.component";

const LOGIN_ROUTER: Routes = [
    { 
        path: '',
        component: LoginComponent,
        pathMatch:'full'
    }
];

export const loginRouter = RouterModule.forChild(LOGIN_ROUTER );
