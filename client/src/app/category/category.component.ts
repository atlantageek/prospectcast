import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['cat_name', 'count'];

  categories:BehaviorSubject<{}> = new BehaviorSubject(null);
  dataSource = new MatTableDataSource();
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getCategories();
    this.dataSource.sort = this.sort;
  }

  getCategories() {
    
    this.rest.getCategories().subscribe((data: any[]) => {
      this.dataSource.data = data;
      console.log(data)
    });
  }

}
