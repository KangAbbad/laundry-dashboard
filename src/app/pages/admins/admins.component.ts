import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AdminsService } from 'src/app/services/admins/admins.service';
import { IAdminInfo } from 'src/app/models/IAuth';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  adminForm: FormGroup = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    name: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  admins: IAdminInfo[] = [];
  selectedAdmin!: IAdminInfo;
  selectedAdmins: IAdminInfo[] = [];
  isSubmitted: boolean = false;

  constructor(private adminService: AdminsService) {}

  ngOnInit(): void {
    this.adminService
      .httpGetAdmins()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe(res => {
        this.admins = res;
      });
  }
}
