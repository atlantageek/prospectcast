import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'count'];

  categories:BehaviorSubject<{}> = new BehaviorSubject(null);

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    
    this.rest.getCategories().subscribe((data: {}) => {
      this.categories.next(data);
    });
  }

}
