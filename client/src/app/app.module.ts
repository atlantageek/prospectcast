import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { RestService } from './rest.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { CategoryComponent } from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'  
import { AgGridModule } from 'ag-grid-angular';
import { FullproductComponent } from './fullproduct/fullproduct.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { GlobeComponent } from './components/globe/globe.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    ProductDetailComponent,
    FullproductComponent,
    BarChartComponent,
    LineChartComponent,
    CalendarComponent,
    GlobeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgGridModule.withComponents([])
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
