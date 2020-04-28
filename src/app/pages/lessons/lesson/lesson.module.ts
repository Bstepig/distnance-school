import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './lesson.component';


@NgModule({
  declarations: [LessonComponent],
  imports: [
    CommonModule,
    LessonRoutingModule
  ]
})
export class LessonModule { }
