import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appStop]'
})
export class StopDirective {

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.preventDefault();
  }

}
