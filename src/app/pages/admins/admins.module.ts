import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';

import { AdminsService } from 'src/app/services/admins/admins.service';
import { AdminsComponent } from './admins.component';
import { AdminsRoutingModule } from './admins-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    TableModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule,
    ToastModule,
    RadioButtonModule,
    ConfirmDialogModule,
    PaginatorModule,
    SkeletonModule,
  ],
  declarations: [AdminsComponent],
  providers: [AdminsService, MessageService, ConfirmationService],
})
export class AdminsModule {}
