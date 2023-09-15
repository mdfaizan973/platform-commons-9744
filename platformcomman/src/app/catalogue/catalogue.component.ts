import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  products: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('../assets/products.json').subscribe((data) => {
      this.products = data;
      console.log('Products:', this.products);
    });
  }
}
