import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { saveAs } from 'file-saver-es';

import { AdminsService } from 'src/app/services/admins/admins.service';
import { IAdmin, IAdminRequest } from 'src/app/models/IAdmin';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  adminForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    name: new FormControl('', Validators.required),
    idCard: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  isAdminVisible: boolean = false;
  admins: IAdmin[] = [];
  selectedAdmin: IAdmin | undefined;
  selectedAdminId: number | undefined;
  selectedAdmins: IAdmin[] = [];
  isSubmitted: boolean = false;
  isSubmitLoading: boolean = false;
  isAdminListLoading: boolean = false;
  isAdminDetailLoading: boolean = false;
  isDeleteLoading: boolean = false;

  currentPage: number = 1;
  perPage: number = 5;
  totalPage: number = 1;
  totalData: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminsService: AdminsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      queryParams = params;
    });
    this.onGetAdmins(queryParams);
  }

  onGetAdmins(params?: { [key: string]: string | number }): void {
    this.isAdminListLoading = true;

    this.adminsService
      .httpGetAdmins(params)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe(res => {
        this.admins = res.data;
        this.totalData = res.meta.total_data;
        this.isAdminListLoading = false;
      });
  }

  onChangePage(pagination: { page: number; first: number; rows: number; pageCount: number }): void {
    let queryParams: { page: number; per_page: number; sort?: string } = {
      page: pagination.page + 1,
      per_page: pagination.rows,
    };
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['sort']) {
        queryParams.sort = params['sort'];
      }
    });
    this.onGetAdmins(queryParams);
  }

  onToggleAdminModal(): void {
    this.isAdminVisible = !this.isAdminVisible;
  }

  onHideAdminModal(): void {
    this.adminForm.reset();
    this.selectedAdmin = undefined;
  }

  onExport(): void {
    this.adminsService
      .httpGetAdminExcel()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe(blob => {
        saveAs(blob, 'admins.xlsx');
      });
  }

  onAddPreview(): void {
    this.onToggleAdminModal();
    this.adminForm.reset();
  }

  onEditPreview(admin: IAdmin): void {
    this.selectedAdminId = admin.id;
    this.isAdminDetailLoading = true;

    this.adminsService
      .httpGetAdminDetail(admin.id)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe(res => {
        if (res) {
          this.selectedAdmin = res.data;
          this.adminForm = this.formBuilder.group({
            username: new FormControl({
              value: res.data.username,
              disabled: true,
            }),
            email: new FormControl({
              value: res.data.email,
              disabled: true,
            }),
            phone: new FormControl({
              value: res.data.phone,
              disabled: true,
            }),
            name: new FormControl(res.data.name),
            idCard: new FormControl(res.data.id_card),
            address: new FormControl(res.data.address),
            password: '',
          });
          this.onToggleAdminModal();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Admin Not Found',
            detail: '',
          });
        }
        this.isAdminDetailLoading = false;
      });
  }

  onDeletePreview(id: number) {
    this.selectedAdminId = id;
    this.confirmationService.confirm({
      header: 'Delete Admin',
      message: 'Do you want to delete this admin? Admin will deleted permanently, so be careful',
      icon: 'pi pi-info-circle',
      defaultFocus: 'none',
      acceptIcon: '',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      accept: () => {
        this.isDeleteLoading = true;

        this.adminsService
          .httpDeleteAdmin(id)
          .pipe(takeUntil(this.ngUnsubsribe))
          .subscribe(() => {
            this.isDeleteLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Admin Deleted!',
            });
            this.selectedAdminId = undefined;
            this.onGetAdmins();
          });
      },
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-primary p-button-sm',
      reject: () => {
        this.selectedAdminId = undefined;
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.adminForm.invalid) return;

    this.isSubmitLoading = true;

    const { idCard, ...rest } = this.adminForm.value;

    const payload: IAdminRequest = {
      ...rest,
      id_card: idCard,
    };

    const httpSubmitService = this.selectedAdmin
      ? this.adminsService.httpUpdateAdmin(this.selectedAdmin.id, payload)
      : this.adminsService.httpCreateAdmin(payload);

    httpSubmitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe(() => {
      this.isSubmitted = false;
      this.isSubmitLoading = false;
      this.onToggleAdminModal();
      this.adminForm.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Admin Created!',
      });
      this.onGetAdmins();
    });
  }
}
