import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, map } from 'rxjs';

@Directive({
    selector: '[appPhoneNumber]',
    providers: [DecimalPipe],
})
export class PhoneNumberDirective {
    regexStr = '^[0-9]*$';
    private subscription: Subscription;


    constructor(private el: ElementRef) { }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: any) {
      const e = event.key;
      if ([46, 8, 9, 27, 13, 110].indexOf(e) !== -1 ||
        // Allow: Ctrl+A
        (e === 65 && e.ctrlKey) ||
        // Allow: Ctrl+C
        (e === 67 && e.ctrlKey) ||
        // Allow: Ctrl+X
        (e === 88 && e.ctrlKey) ||
        // Allow: home, end, left, right
        (e >= 35 && e <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
  
    }
  
    @HostListener('contextmenu', ['$event'])
    onMouseRightClick(event) {
      if (event.which === 3) {
        const e = <MouseEvent>event;
        e.preventDefault();
      }
    }
  
    @HostListener('input', ['$event']) onInputChange(event) {
      const initalValue = this.el.nativeElement.value;
      this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
      if (initalValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }
}

