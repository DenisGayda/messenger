import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {EStatusType} from './config/enums/EStatusType';

@Directive({
  selector: '[windowLoad]'
})
export class WindowLoadDirective {

  @Output() statusType = new EventEmitter<string>();

  @HostListener('window:load', []) onWindowLoad() {
    this.statusType.emit(EStatusType.ONLINE);
  }

  @HostListener('window:unload', []) onWindowUnLoad() {
    this.statusType.emit(EStatusType.OFFLINE);
  }

}
