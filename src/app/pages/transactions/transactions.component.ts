import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { saveAs } from 'file-saver-es';

import { TransactionsService } from 'src/app/services/transactions/transactions.service';
import { ITransactionResponse, ITransactionRequest } from 'src/app/models/ITransaction';
import { IAdmin } from 'src/app/models/IAdmin';
import { AdminsService } from 'src/app/services/admins/admins.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  @ViewChild('paginator', { static: false }) paginator: Paginator | undefined;

  private ngUnsubsribe: Subject<any> = new Subject();
  transactionForm: FormGroup = new FormGroup({
    admin: new FormControl('', Validators.required),
    weight: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    notes: new FormControl('', Validators.required),
    totalPrice: new FormControl('', Validators.required),
    status: new FormControl('NEW', Validators.required),
  });
  isTransactionVisible: boolean = false;
  transactions: ITransactionResponse[] = [];
  selectedTransaction: ITransactionResponse | undefined;
  selectedTransactionId: number | undefined;
  selectedTransactions: ITransactionResponse[] = [];
  admins: IAdmin[] = [];
  selectedAdmin: IAdmin | undefined;
  isSubmitted: boolean = false;
  isTransactionLoading: boolean = false;
  isSubmitLoading: boolean = false;
  isAdminLoading: boolean = false;
  isDeleteLoading: boolean = false;

  firstPaginator: number = 0;
  currentPage: number = 1;
  perPage: number = 5;
  totalPage: number = 1;
  totalData: number = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private transactionsService: TransactionsService,
    private adminsService: AdminsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      const page = Number(params['page'] ?? 1);
      const perPage = Number(params['per_page'] ?? 5);

      queryParams = {
        page,
        per_page: perPage,
      };

      setTimeout(() => {
        this.currentPage = page;
        this.perPage = perPage;
        this.firstPaginator = (page - 1) * perPage;
      }, 0);
    });
    this.onGetTransactions(queryParams);
  }

  // ngDoCheck(): void {
  //   console.log('firstPage', this.firstPaginator);
  //   console.log('currentPage', this.currentPage);
  //   console.log('perPage', this.perPage);
  //   // console.clear();
  // }

  onGetTransactions(params?: { [key: string]: string | number }): void {
    this.isTransactionLoading = true;

    this.router.navigate(['/dashboard/transactions'], { queryParams: params, replaceUrl: true });

    this.transactionsService
      .httpGetTransactions(params)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe(res => {
        this.transactions = res.data;
        this.totalData = res.meta.total_data;
        this.isTransactionLoading = false;
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
    this.onGetTransactions(queryParams);
  }

  onToggleTransactionModal(): void {
    this.isTransactionVisible = !this.isTransactionVisible;

    if (this.isTransactionVisible) {
      this.adminsService
        .httpGetAdmins()
        .pipe(takeUntil(this.ngUnsubsribe))
        .subscribe(res => {
          this.admins = res.data;
        });
    }
  }

  onHideTransactionModal(): void {
    this.transactionForm.reset();
    this.selectedTransaction = undefined;
    this.selectedAdmin = undefined;
  }

  onExport(): void {
    this.transactionsService
      .httpGetTransactionExcel()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe(blob => {
        saveAs(blob, 'transactions.xlsx');
      });
  }

  onAddPreview(): void {
    this.onToggleTransactionModal();
    this.transactionForm = this.formBuilder.group({
      admin: '',
      weight: '',
      notes: '',
      totalPrice: '',
      status: 'NEW',
    });
  }

  onEditPreview(transaction: ITransactionResponse): void {
    this.selectedTransactionId = transaction.id;
    this.isAdminLoading = true;

    this.adminsService
      .httpGetAdminDetail(transaction.admin_id)
      .pipe(
        switchMap((res: any) => {
          if (res.data) {
            this.selectedAdmin = res.data;
            this.isAdminLoading = false;
            return this.transactionsService.httpGetTransactionDetail(transaction.id);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Admin Not Found',
              detail: 'The admin in this transaction was not found!',
            });
            return of(undefined);
          }
        }),
        takeUntil(this.ngUnsubsribe)
      )
      .subscribe(res => {
        if (!res) return;
        this.selectedTransaction = res.data;
        this.transactionForm = this.formBuilder.group({
          admin: this.selectedAdmin,
          weight: res.data.weight,
          notes: res.data.notes,
          totalPrice: res.data.total_price,
          status: res.data.status,
        });
        this.onToggleTransactionModal();
      });
  }

  onDeletePreview(id: number) {
    this.selectedTransactionId = id;
    this.confirmationService.confirm({
      header: 'Delete Transaction',
      message: 'Do you want to delete this transaction? Transaction will deleted permanently, so be careful',
      icon: 'pi pi-info-circle',
      defaultFocus: 'none',
      acceptIcon: '',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      accept: () => {
        this.isDeleteLoading = true;

        this.transactionsService
          .httpDeleteTransaction(id)
          .pipe(takeUntil(this.ngUnsubsribe))
          .subscribe(() => {
            this.isDeleteLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Transaction Deleted!',
            });
            this.selectedTransactionId = undefined;
            this.onGetTransactions();
          });
      },
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-primary p-button-sm',
      reject: () => {
        this.selectedTransactionId = undefined;
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.transactionForm.invalid) return;

    this.isSubmitLoading = true;

    const { admin, weight, totalPrice, notes, status } = this.transactionForm.value;

    const payload: ITransactionRequest = {
      admin_id: admin.id,
      weight,
      total_price: totalPrice,
      notes,
      status,
    };

    const httpSubmitService = this.selectedTransaction
      ? this.transactionsService.httpUpdateTransaction(this.selectedTransaction.id, payload)
      : this.transactionsService.httpCreateTransaction(payload);

    httpSubmitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe(() => {
      this.isSubmitted = false;
      this.isSubmitLoading = false;
      this.onToggleTransactionModal();
      this.transactionForm.reset();
      this.onGetTransactions();
    });
  }
}
