import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnDestroy, OnInit, AfterViewInit {

  selectedProduct: Product | undefined;

  products: Product[] = [];

  products$: Observable<Product[]> | undefined;

  @ViewChild(ProductDetailComponent) productDetail: ProductDetailComponent | undefined;

  private productsSub: Subscription | undefined;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductsAsync();
  }

  private getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  private getProductsAsync() {
    this.products$ = this.productService.getProducts();
  }

  ngAfterViewInit(): void {
    if (this.productDetail) {
      console.log(`${this.productDetail.product} from ngAfterViewInit`);
    }
  }

  ngOnDestroy(): void { // unsubscribe from an observable manually
      this.productsSub?.unsubscribe();
  }

  onBuy() {
    window.alert(`You just bought ${this.selectedProduct?.name}!`)
  }

  onAdd(product: Product) {
    this.products.push(product);
  }

  onDelete() {
    this.products = this.products.filter(product => product !== this.selectedProduct);
    this.selectedProduct = undefined;
  }
  
}
