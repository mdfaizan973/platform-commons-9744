import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'platformcomman';
  cartItems: any;
  ngOnInit() {
    const cartItemsData = localStorage.getItem('cartItems');

    if (cartItemsData) {
      this.cartItems = JSON.parse(cartItemsData);
      console.log('Cart Items:', this.cartItems.length);
    } else {
      this.cartItems = [];
    }
  }
}
