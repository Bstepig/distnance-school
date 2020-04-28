import {
  DefaultBackgroundImageDirective,
  DefaultImageDirective,
} from './default-image.directive';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [DefaultImageDirective, DefaultBackgroundImageDirective],
  exports: [DefaultImageDirective, DefaultBackgroundImageDirective],
  imports: [CommonModule],
})
export class DefaultImageModule {}
