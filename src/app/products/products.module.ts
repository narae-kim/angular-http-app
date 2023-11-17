import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SortPipe } from './sort.pipe';
import { ProductHostDirective } from './product-host.directive';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductCreateComponent } from './product-create/product-create.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    SortPipe,
    ProductHostDirective,
    ProductViewComponent,
    ProductCreateComponent
  ],
  imports: [
    CommonModule,
    ProductComponent
  ],
  exports: [ ProductListComponent ]
})
export class ProductsModule { }
