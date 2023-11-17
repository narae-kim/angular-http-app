import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  // encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnChanges {
  @Input() id = -1;
  product$: Observable<Product> | undefined;

  @Input() product: Product | undefined;
  @Output() bought = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor(private productService: ProductsService, public authService: AuthService) {
    console.log(`Name is ${this.product} in the constructor`);
  }

  ngOnChanges(): void {
    this.product$ = this.productService.getProduct(this.id);
  }

  ngOnInit(): void {
    console.log(`Name is ${this.product} in the ngOnInit`);
  }

  buy() {
    this.bought.emit();
  }

  changePrice(product: Product, price: number) {
    this.productService.updateProduct(product.id, price).subscribe(() => {
      alert(`The price of ${product.name} was changed!`)
    });
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    });
  }

}
