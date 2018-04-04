import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {IMyUser} from '../config/interfaces/IMyUser';
import {LocalStorage} from '../decorators/local-storage.decorator';

@Directive({
  selector: '[windowLoad]'
})
export class WindowLoadDirective {

  @LocalStorage localLogined: boolean;
  @LocalStorage userInMyApp: IMyUser;
  @Output() eventType = new EventEmitter();

  @HostListener('window:load', []) onWindowLoad() {
    this.eventType.emit('online');
  }

  @HostListener('window:unload', []) onWindowUnLoad() {
    this.eventType.emit('offline');
  }

}
