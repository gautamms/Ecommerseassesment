import { NgModule } from '@angular/core';
import { OnlyNumber } from "./onlynumber.directive";
import { PhoneNumberDirective } from './phone-number.directive';

export const components = [
  OnlyNumber
];

@NgModule({
  declarations: [	components,
      PhoneNumberDirective
   ],
  exports: [components,PhoneNumberDirective]
})
export class DirectivesModule { }
