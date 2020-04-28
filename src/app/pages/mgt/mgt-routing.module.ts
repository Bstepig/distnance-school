import { RouterModule, Routes } from '@angular/router';

import { DirectorGuard } from '@core/guards/director.guard';
import { MgtComponent } from './mgt.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MgtComponent,
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MgtRoutingModule {}
