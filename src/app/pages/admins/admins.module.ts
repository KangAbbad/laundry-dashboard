import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsComponent } from './admins.component';
import { AdminsRoutingModule } from './admins-routing.module';

@NgModule({
  imports: [CommonModule, AdminsRoutingModule],
  declarations: [AdminsComponent],
})
export class AdminsModule {}
