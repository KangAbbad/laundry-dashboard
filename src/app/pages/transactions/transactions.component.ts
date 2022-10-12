import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

import { TransactionsService } from 'src/app/services/transactions/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class TransactionsComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  transactionForm: FormGroup = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    name: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  productDialog: boolean = false;
  transactions: any[] = [];
  transaction!: any;
  selectedTransactions: any[] = [];
  isSubmitted: boolean = false;
  statuses: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private transactionService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];

    this.transactionService
      .httpGetList()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe(res => {
        // if (!res) return;
        console.log(res);
      });
  }
}
