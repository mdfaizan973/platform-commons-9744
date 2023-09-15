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
  existingCartItemQuantity: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('../assets/products.json').subscribe((data) => {
      this.products = data;
      // console.log('Products:', this.products);
    });
    // ---
  }

  // ----
  addToCart(event: Event, id: number) {
    event.preventDefault();
    // console.log('Added to cart', id);
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
        this.existingCartItemQuantity = existingCartItem.Quantity; // Store the quantity
        // localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
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
    console.log(id);
  }
}
