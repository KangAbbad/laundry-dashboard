import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import { IAdminInfo } from 'src/app/models/IAuth';
import { AdminsService } from 'src/app/services/admins/admins.service';
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
    // private formBuilder: FormBuilder,
    private messageService: MessageService,
    // private authService: AuthService,
    private sessionService: SessionService,
    private adminsService: AdminsService
  ) {}

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   email: ['user01', Validators.required],
    //   password: ['rahasia123', Validators.required],
    // });

    this.activatedRoute.queryParams.subscribe(params => {
      if (!Object.keys(params).length) return;
      this.loginForm.setValue({
        ...this.loginForm.value,
        email: params['email'],
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

    this.adminsService
      .httpGetAdminList()
      .pipe(
        // switchMap((res: any) => {
        //   if (res) localStorage.setItem('access_token', res.data.access_token);
        //   return this.authService.httpGetUserInfo();
        // }),
        takeUntil(this.ngUnsubsribe)
      )
      .subscribe(res => {
        const delayTest = 1500;
        localStorage.setItem('access_token', 'testingpurpose');

        if (res.length) {
          const selectedAdmin: IAdminInfo = res.find((admin: IAdminInfo) => {
            const isEmailValid = this.loginForm.value.username === admin.email;
            const isUsernameValid =
              this.loginForm.value.username === admin.username;
            const isPasswordValid =
              this.loginForm.value.password === admin.password;

            if ((isEmailValid || isUsernameValid) && isPasswordValid) {
              return admin;
            } else {
              return null;
            }
          });

          if (selectedAdmin) {
            this.onShowSuccessLogin(selectedAdmin);
            this.sessionService.createSession(res as IAdminInfo);
            setTimeout(() => {
              this.isSubmitted = false;
              this.isLoading = false;
              this.router.navigateByUrl('/dashboard');
            }, delayTest);
          }
        }
      });
  }
}
