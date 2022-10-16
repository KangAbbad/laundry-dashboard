import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { IDailyRevenueResponse } from 'src/app/models/ISummaryRevenue';
import { SummaryRevenueService } from 'src/app/services/summary-revenue/summary-revenue.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  private ngUnsubscribe: Subject<any> = new Subject();
  todayRevenue: number = 0;
  dailyRevenue: IDailyRevenueResponse[] = [];
  isTodayRevenueLoading: boolean = false;
  isDailyRevenueLoading: boolean = false;

  firstPaginator: number = 0;
  currentPage: number = 1;
  perPage: number = 5;
  totalPage: number = 1;
  totalData: number = 1;

  constructor(private summaryRevenueService: SummaryRevenueService) {}

  ngOnInit(): void {
    this.onGetTodayRevenue();
    this.onGetDailyRevenue();
  }

  onGetTodayRevenue(): void {
    this.isTodayRevenueLoading = true;
    this.summaryRevenueService
      .httpGetSummaryRevenueToday()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.todayRevenue = res.data.reduce((acc: any, curr: any) => acc + curr.total_revenue, 0);
        this.isTodayRevenueLoading = false;
      });
  }

  onGetDailyRevenue(params?: { [key: string]: string | number }): void {
    this.isDailyRevenueLoading = true;
    this.summaryRevenueService
      .httpGetSummaryRevenue(params)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.dailyRevenue = res.data;
        this.totalData = res.meta.total_data;
        this.isDailyRevenueLoading = false;
      });
  }

  onChangePage(pagination: { page: number; first: number; rows: number; pageCount: number }): void {
    let queryParams: { page: number; per_page: number; sort?: string } = {
      page: pagination.page + 1,
      per_page: pagination.rows,
    };
    this.onGetDailyRevenue(queryParams);
  }
}
