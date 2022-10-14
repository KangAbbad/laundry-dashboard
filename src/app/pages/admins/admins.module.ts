import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';

import { AdminsComponent } from './admins.component';
import { AdminsRoutingModule } from './admins-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminsRoutingModule,
    ReactiveFormsModule,
    FileUploadModule,
    TableModule,
  ],
  declarations: [AdminsComponent],
})
export class AdminsModule {}
