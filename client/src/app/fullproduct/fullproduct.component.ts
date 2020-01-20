import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { BehaviorSubject} from 'rxjs';
@Component({
  selector: 'app-fullproduct',
  templateUrl: './fullproduct.component.html',
  styleUrls: ['./fullproduct.component.css']
})
export class FullproductComponent implements OnInit {
  constructor(public rest:RestService,) { }
  title = 'app';
  products:BehaviorSubject<{}> = new BehaviorSubject(null);

  columnDefs = [
    {headerName: 'Category Ident', field: 'category_ident', rowGroup: true},
      {headerName: 'ID', field: 'id' },
      {headerName: 'Name', field: 'name' },
 
  ];


  ngOnInit() {

    this.rest.getProducts().subscribe((data: {}) => {
      console.log(data);
      this.products.next(data);
    });
  }

}
