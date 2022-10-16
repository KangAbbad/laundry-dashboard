import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, CardModule, InputTextModule, ToastModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
