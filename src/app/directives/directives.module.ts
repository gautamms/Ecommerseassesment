import { NgModule } from '@angular/core';
import { OnlyNumber } from "./onlynumber.directive";

export const components = [
  OnlyNumber
];

@NgModule({
  declarations: [	components,
      
   ],
  exports: [components]
})
export class DirectivesModule { }
