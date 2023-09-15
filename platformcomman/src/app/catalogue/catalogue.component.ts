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

  addToCart(event: Event) {
    event.preventDefault();
    console.log('Added to cart. Product ID:');
    this.showAddToCartButton = false;
  }

  decrementQuantity(event: Event) {
    event.preventDefault();

    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  incrementQuantity(event: Event) {
    event.preventDefault();

    this.quantity++;
  }
}
