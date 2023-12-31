import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
  showAlert: boolean = false;

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
      console.log(typeof item.Price);
      totalPrice += item.Quantity * item.Price;
    }
    return Number(totalPrice.toFixed(2));
  }
  geSinglePrice(): number {
    let onlySiglePrice = 0;
    for (const item of this.cartItems) {
      onlySiglePrice += item.Price;
    }
    return Number(onlySiglePrice.toFixed(2));
  }
  removeFromLocalStorage(index: number) {
    this.showAlert = true;
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    setTimeout(() => {
      this.showAlert = false;
    }, 2200);
  }
}
