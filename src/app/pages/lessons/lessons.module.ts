import { CommonModule } from '@angular/common';
import { LessonsComponent } from './lessons.component';
import { LessonsRoutingModule } from './lessons-routing.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LessonsComponent],
  imports: [CommonModule, LessonsRoutingModule, TranslateModule],
})
export class LessonsModule {}
