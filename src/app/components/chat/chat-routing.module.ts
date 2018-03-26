import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ChatComponent} from "./chat.component";

const CHAT_ROUTER: Routes = [
    { 
        path: '',
        component: ChatComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(CHAT_ROUTER)],
    exports: [RouterModule]
  })
export class ChatRoutingModule {}