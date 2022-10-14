import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, switchMap } from 'rxjs';

import { IAdminInfo } from 'src/app/models/IAuth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  private ngUnsubsribe: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!Object.keys(params).length) return;
      this.loginForm.setValue({
        ...this.loginForm.value,
        username: params['email'],
      });
    });
  }

  onShowErrorLogin(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Failed Login!',
      detail: 'Invalid Credential, try again!',
    });
  }

  onShowSuccessLogin(selectedAdmin: IAdminInfo): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Login Success!',
      detail: `Welcome, ${selectedAdmin.username}!`,
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.loginForm.invalid) return;

    this.isLoading = true;

    this.authService
      .httpCreateLogin(this.loginForm.value)
      .pipe(
        switchMap((res: any) => {
          if (res) localStorage.setItem('access_token', res.data.access_token);
          return this.authService.httpGetUserInfo();
        }),
        takeUntil(this.ngUnsubsribe)
      )
      .subscribe((res: any) => {
        if (res) {
          const { id_card: idCard, ...rest } = res.data;
          const currentSession: IAdminInfo = { ...rest, idCard };

          this.sessionService.createSession(currentSession);
          this.onShowSuccessLogin(currentSession);

          setTimeout(() => {
            this.isSubmitted = false;
            this.isLoading = false;
            this.router.navigateByUrl('/dashboard');
          }, 1000);
        } else {
          this.onShowErrorLogin();
        }
      });
  }
}
