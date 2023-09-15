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
  getTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      console.log(item.Price);
      totalPrice += item.Quantity * item.Price.toFixed(2);
    }
    return totalPrice;
  }
  geSinglePrice(): number {
    let onlySiglePrice = 0;
    for (const item of this.cartItems) {
      onlySiglePrice += item.Price.toFixed(2);
    }
    return onlySiglePrice;
  }
  removeFromLocalStorage(index: number) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }
}
