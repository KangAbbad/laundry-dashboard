import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminsComponent } from './admins.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', title: 'Admins', component: AdminsComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AdminsRoutingModule {}
