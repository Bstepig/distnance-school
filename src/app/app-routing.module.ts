import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/guards';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
    canDeactivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/mgt/mgt.module').then((m) => m.MgtModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/tasks',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
