import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { BehaviorSubject} from 'rxjs';
import { ActivatedRoute,Event, NavigationStart, RoutesRecognized,
  RouteConfigLoadStart, RouteConfigLoadEnd, Router,
 NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['id','name','category_ident'];

  products:BehaviorSubject<{}> = new BehaviorSubject(null);

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router, private _activatedRoute: ActivatedRoute) {
    this.route.params.subscribe(params=> {
      console.log(params)
      let category_id = +params['category_id']
      this.getProductsByCategory(category_id)
    })
      
  
   }

  ngOnInit() {
    let category_id=this._activatedRoute.snapshot.paramMap.get("category_id");
    console.log("CATEGORY ID: " + category_id);
    //debugger;
    if (category_id == null)
      //this.getProducts();
      console.log("A")
    else
      this.getProductsByCategory(+category_id)
  }

  getProducts() {
    
    this.rest.getProducts().subscribe((data: {}) => {
      this.products.next(data);
    });
  }
  getProductsByCategory(category_id: number) {
    
    this.rest.getProductsByCategory(category_id).subscribe((data: {}) => {
      console.log(data);
      this.products.next(data);
    });
  }

}
