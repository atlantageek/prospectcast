import { Component, OnInit } from '@angular/core';
import { RestService, BarDataModel, SalesModel } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, timer} from 'rxjs';
import {take} from 'rxjs/operators';
import { now } from 'd3';
interface Product {
  name:string,
  id:number,
  category_id:number
}



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product_id=null;
  data:BehaviorSubject<BarDataModel[]> = new BehaviorSubject<BarDataModel[]>([])

  productData:BehaviorSubject<Product>=new BehaviorSubject(null);
  salesData:BehaviorSubject<SalesModel[]>=new BehaviorSubject(null);
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params=> {
      console.log(params)
      this.product_id = +params['product_id']
      this.getProduct(this.product_id)
    })

  }
  getProduct(product_id: number) {
    
    this.rest.getProduct(product_id).subscribe((data: Product) => {
      console.log(data);
      this.productData.next( data);
    });
    this.rest.getSalesForProduct(product_id).subscribe((data: SalesModel[]) => {
      console.log(data);
      this.salesData.next(data);
    })
  }
}
