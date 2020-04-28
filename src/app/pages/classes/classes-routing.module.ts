import { RouterModule, Routes } from '@angular/router';

import { CheckRoleGuard } from './../../core/guards/check-role.guard';
import { ClassesComponent } from './classes.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ClassesComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    loadChildren: () =>
      import('../schedule/schedule.module').then((m) => m.ScheduleModule),
    canActivate: [CheckRoleGuard],
    data: {
      edit: true,
      allowedRoles: ['D'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassesRoutingModule {}
