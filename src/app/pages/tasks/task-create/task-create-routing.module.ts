import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TaskCreateComponent } from './task-create.component';

const routes: Routes = [
  {
    path: '',
    component: TaskCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskCreateRoutingModule {}
