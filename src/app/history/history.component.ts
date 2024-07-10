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
  constructor(private orderService: OrderService) { }

  async ngOnInit() {
    const id = JSON.parse(localStorage.getItem('userid') || '0');

    // call getOrders API, which returns all the orders of current user
    this.orders = await this.orderService.getOrders(id);
    
    // set boolean variable to hide/show the no orders text
    this.noOrders = !this.orders.length;
  }
}
