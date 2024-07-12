import { PageEvent } from '@angular/material/paginator';
import { OrderService } from './../services/order.services';
import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  orders: any;
  searchText = '';
  noOrders = false;
  displayedColumns: string[] = ['orderNumber', 'total', 'date'];

  length: any;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: any;

  constructor(private orderService: OrderService) { }

  async ngOnInit() {
    const id = JSON.parse(localStorage.getItem('userid') || '0');

    const response = await this.orderService.getOrdersCount(id); 
    this.length = response.count;

    // call getOrders API, which returns all the orders of current user
    this.orders = await this.orderService.getOrders(this.pageSize, 0, id);

    // set boolean variable to hide/show the no orders text
    this.noOrders = !this.orders.length;
  }

  async handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    const id = JSON.parse(localStorage.getItem('userid') || '0');

    this.orders = await this.orderService.getOrders(this.pageSize, this.pageIndex * 5, id);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
