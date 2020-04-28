import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: 'edit',
    component: ProfileComponent,
    data: { edit: true },
  },
  {
    path: '',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
