import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';

import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { SummaryRevenueService } from 'src/app/services/summary-revenue/summary-revenue.service';

@NgModule({
  declarations: [HomepageComponent],
  imports: [CommonModule, HomepageRoutingModule, CardModule, TableModule, PaginatorModule, SkeletonModule],
  providers: [SummaryRevenueService],
})
export class HomepageModule {}
