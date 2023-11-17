import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductViewService } from './product-view.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
  providers: [ProductViewService]
})
export class ProductViewComponent implements OnDestroy, OnInit {

  @Input() id = -1;

  name = '';

  private productSub = new Subject<void>();

  constructor(private productViewService: ProductViewService) {}

  ngOnInit(): void {
      this.getProduct();
  }

  private getProduct() {
    this.productViewService.getProduct(this.id).pipe(
      takeUntil(this.productSub) // unsubscribe from an observable manually by Subject
    ).subscribe(product => {
      if(product) {
        this.name = product.name;
      }
    });
  }

  ngOnDestroy(): void {
      this.productSub.next();
      this.productSub.complete();
  }
}
