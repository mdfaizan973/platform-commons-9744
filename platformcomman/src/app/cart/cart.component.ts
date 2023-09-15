import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = JSON.parse(localStorage.getItem('cartItems') || '[]');

  ngOnInit() {
    const cartItemsData = localStorage.getItem('cartItems');

    if (cartItemsData) {
      this.cartItems = JSON.parse(cartItemsData);
    } else {
      this.cartItems = [];
    }
  }

  removeFromLocalStorage(index: number) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }
}
