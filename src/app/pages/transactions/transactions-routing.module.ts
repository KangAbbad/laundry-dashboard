import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TransactionsComponent } from './transactions.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', title: 'Transactions', component: TransactionsComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
