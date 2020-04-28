import { RouterModule, Routes } from '@angular/router';

import { DirectorGuard } from '@core/guards/director.guard';
import { MgtComponent } from './mgt.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MgtComponent,
    children: [
      {
        path: 'tasks',
        loadChildren: () =>
          import('../tasks/tasks.module').then((m) => m.TasksModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('../schedule/schedule.module').then((m) => m.ScheduleModule),
      },
      {
        path: 'lessons',
        loadChildren: () =>
          import('../lessons/lessons.module').then((m) => m.LessonsModule),
      },
      {
        path: 'classes',
        loadChildren: () =>
          import('../classes/classes.module').then((m) => m.ClassesModule),
        canActivate: [DirectorGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
        canActivate: [DirectorGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MgtRoutingModule {}
