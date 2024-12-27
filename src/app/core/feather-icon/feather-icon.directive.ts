import { Directive, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appFeatherIcon]'
})
export class FeatherIconDirective implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    // feather icon
    // feather.replace();
  }

}
