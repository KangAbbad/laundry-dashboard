import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', title: 'Sign Up', component: RegisterComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
