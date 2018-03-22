import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from "./chat.component";

const CHAT_ROUTER: Routes = [
    { 
        path: '',
        component: ChatComponent
    }
];

export const chatRouter = RouterModule.forChild(CHAT_ROUTER);
