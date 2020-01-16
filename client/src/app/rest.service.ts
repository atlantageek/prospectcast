import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = '/api/v1/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

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


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

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
