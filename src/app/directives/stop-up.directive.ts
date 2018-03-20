import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appStopUp]'
})
export class StopUpDirective {

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    event.stopPropagation();
  }

}
