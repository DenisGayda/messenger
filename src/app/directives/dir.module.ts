import {StopDirective} from './stop.directive';
import {StopUpDirective} from './stop-up.directive';
import {NgModule} from '@angular/core';
import {WindowLoadDirective} from './windowLoad.directive';

const DIRECTIVES = [
  StopDirective,
  StopUpDirective,
  WindowLoadDirective
];

@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class DirModule {}
