import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TaskCreateComponent } from './task-create.component';
import { TaskCreateRoutingModule } from './task-create-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TaskCreateComponent],
  imports: [
    CommonModule,
    TaskCreateRoutingModule,
    FormsModule,
    TranslateModule,
  ],
})
export class TaskCreateModule {}
