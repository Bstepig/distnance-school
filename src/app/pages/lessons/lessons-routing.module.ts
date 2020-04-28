import { RouterModule, Routes } from '@angular/router';

import { LessonsComponent } from './lessons.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: ':id',
    loadChildren: () =>
      import('./lesson/lesson.module').then((m) => m.LessonModule),
  },
  {
    path: '',
    component: LessonsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsRoutingModule {}
