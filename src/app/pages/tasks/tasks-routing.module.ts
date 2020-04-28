import { CheckRoleGuard, DirectorGuard, TeacherGuard } from '@core/guards';
import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks.component';

const routes: Routes = [
  {
    path: 'create',
    loadChildren: () =>
      import('./task-create/task-create.module').then(
        (m) => m.TaskCreateModule
      ),
    canActivate: [CheckRoleGuard],
    data: {
      allowedRoles: ['T', 'D'],
    },
  },
  {
    path: ':id',
    loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
  },
  {
    path: '',
    component: TasksComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
