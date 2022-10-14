import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    name: new FormControl('', Validators.required),
    idCard: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.registerForm.invalid) return;

    this.isLoading = true;

    const { idCard, ...rest } = this.registerForm.value;
    const payload = { ...rest, id_card: idCard };
    this.authService.httpCreateRegister(payload).subscribe(res => {
      if (!res) return;

      this.router.navigate(['/auth/login'], {
        queryParams: {
          email: this.registerForm.value.email,
        },
      });

      this.isSubmitted = false;
      this.isLoading = false;
    });
  }
}
