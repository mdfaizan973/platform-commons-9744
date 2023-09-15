import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any;

  ngOnInit() {
    const cartItemsData = localStorage.getItem('cartItems');

    if (cartItemsData) {
      this.cartItems = JSON.parse(cartItemsData);
      console.log('Cart Items:', this.cartItems);
    } else {
      this.cartItems = [];
    }
  }
}
