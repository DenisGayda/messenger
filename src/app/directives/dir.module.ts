import {StopDirective} from './stop.directive';
import {StopUpDirective} from './stop-up.directive';
import {NgModule} from '@angular/core';

const DIRECTIVES = [
  StopDirective,
  StopUpDirective
];

@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class DirModule {}
