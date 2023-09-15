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
  showAddToCartButton = true;
  quantity = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('../assets/products.json').subscribe((data) => {
      this.products = data;
      console.log('Products:', this.products);
    });
  }

  // addToCart(event: Event, id: Number) {
  //   this.showAddToCartButton = false;
  //   event.preventDefault();
  //   console.log('Added to cart', id);
  // }

  // ----
  addToCart(event: Event, id: number) {
    event.preventDefault();
    console.log('Added to cart', id);

    // Get the existing cart items from local storage (if any)
    const existingCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );

    // Find the product by ID in your products array
    const productToAdd = this.products.find((item: any) => item.id === id);

    if (productToAdd) {
      // Check if the product is already in the cart
      const existingCartItem = existingCartItems.find(
        (item: any) => item.id === id
      );

      if (existingCartItem) {
        existingCartItem.Quantity++;
      } else {
        existingCartItems.push({ ...productToAdd, Quantity: 1 });
      }

      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));

      this.showAddToCartButton = false;
    }
  }

  // ----
  decrementQuantity(event: Event, index: number) {
    event.preventDefault();
    if (this.products[index]) {
      this.products[index].Quantity--;
    }
  }

  incrementQuantity(event: Event, index: number) {
    event.preventDefault();
    if (this.products[index]) {
      this.products[index].Quantity++;
    }
  }
}
