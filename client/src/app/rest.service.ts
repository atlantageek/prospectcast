import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

//"id":2,"dt":"2015-01-27T00:00:00.000Z","location_id":28,"product_id":19439,"price_cents":399900,"count":1
export interface SalesModel {
  dt:Date,
  price?:number,
  count:number
}
const endpoint = '/api/v1/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
export interface BarDataModel {
  letter: string;
  frequency: number;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  constructor(private _http: HttpClient) { }
  getProducts(): Observable<any> {
    return this._http.get(endpoint + 'products').pipe(
      map(this.extractData));
  }

  getProductsByCategory(category_id): Observable<any> {
    return this._http.get(endpoint + 'products_by_category/' + category_id).pipe(
      map(this.extractData));
  }
  getCategories(): Observable<any> {
    return this._http.get(endpoint + 'categories').pipe(
      map(this.extractData));
  }
  getProduct(id): Observable<any> {
    return this._http.get(endpoint + 'products/' + id).pipe(
      map(this.extractData));
  }
  getSalesForProduct(id):Observable<SalesModel[]> {
    return this._http.get<any[]>(endpoint + 'products/' + id + '/sales')               
    .pipe(map(response => {
      let result =  response.map((d) => {
        let s:SalesModel = {
          dt: new Date(Date.parse(d.dt)),
          price: d.price_cents,
          count: d.count
        }
        return s;
       })
       console.log(result)
       return result;

  }))
  //.toPromise();
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  // private extractSalesData(res: Response) {
  //   const arr = JSON.parse(res.json()) as any[]
  //   res.then((data:any[]) => {
  //     return data.map((d) => {
  //       let s:SalesModel = {
  //       dt: new Date(Date.parse(d.dt)),
  //       price: d.price,
  //       count: d.count
  //       }
  //       return s;
  //     })
  //   })

 // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
