import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogueComponent implements OnInit {
  products: any;
  quantity = 1;
  existingCartItemQuantity: number = 1;
  showAddToCartButton = true;
  showAlert: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('../assets/products.json').subscribe((data) => {
      this.products = data;
      // console.log('Products:', this.products);
    });
  }

  // ----
  isProductInCart(productId: number): boolean {
    const existingCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );
    return existingCartItems.some((item: any) => item.id === productId);
  }

  getCartItemQuantity(productId: number): number {
    const existingCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );
    const cartItem = existingCartItems.find(
      (item: any) => item.id === productId
    );
    return cartItem ? cartItem.Quantity : 0;
  }

  addToCart(event: Event, id: number) {
    event.preventDefault();
    // console.log('Added to cart', id);
    this.showAlert = true;
    const existingCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );
    const productToAdd = this.products.find((item: any) => item.id === id);
    if (productToAdd) {
      const existingCartItem = existingCartItems.find(
        (item: any) => item.id === id
      );
      if (existingCartItem) {
        existingCartItem.Quantity++;
        console.log('existingCartItem.Quantity', existingCartItem.Quantity);
        this.existingCartItemQuantity = existingCartItem.Quantity;
      } else {
        existingCartItems.push({ ...productToAdd, Quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      this.showAddToCartButton = false;
    }
    setTimeout(() => {
      this.showAlert = false;
    }, 2200);
  }
  // ----
  increment(event: Event, id: number) {
    event.preventDefault();
    // console.log('Added to cart', id);
    // this.showAlert = true;
    const existingCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );
    const productToAdd = this.products.find((item: any) => item.id === id);
    if (productToAdd) {
      const existingCartItem = existingCartItems.find(
        (item: any) => item.id === id
      );
      if (existingCartItem) {
        existingCartItem.Quantity++;
        console.log('existingCartItem.Quantity', existingCartItem.Quantity);
        this.existingCartItemQuantity = existingCartItem.Quantity;
      } else {
        existingCartItems.push({ ...productToAdd, Quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      this.showAddToCartButton = false;
    }
  }
  // ----

  decrementQuantity(event: Event, id: number) {
    event.preventDefault();
    const existingCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );
    const productToAdd = this.products.find((item: any) => item.id === id);
    if (productToAdd) {
      const existingCartItem = existingCartItems.find(
        (item: any) => item.id === id
      );
      if (existingCartItem) {
        existingCartItem.Quantity--;

        // Remove the item from cartItems when the quantity becomes 0
        if (existingCartItem.Quantity === 0) {
          const indexToRemove = existingCartItems.findIndex(
            (item: any) => item.id === id
          );
          if (indexToRemove !== -1) {
            existingCartItems.splice(indexToRemove, 1);
          }
        }

        this.existingCartItemQuantity = existingCartItem.Quantity;
      } else {
        existingCartItems.push({ ...productToAdd, Quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      this.showAddToCartButton = false;
    }
  }
}
