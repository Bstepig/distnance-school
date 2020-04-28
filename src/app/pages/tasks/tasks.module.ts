import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, TasksRoutingModule, TranslateModule],
})
export class TasksModule {}
