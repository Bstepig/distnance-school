import { CommonModule } from '@angular/common';
import { DefaultImageModule } from '@shared/directives';
import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ShortNameModule } from '@shared/pipes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    TranslateModule,
    ShortNameModule,
    DefaultImageModule,
  ],
})
export class ScheduleModule {}
