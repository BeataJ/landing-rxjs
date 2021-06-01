import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Subject, Observable } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = environment.apiNewsKey;
  private country = 'ca';

  pagesInput: Subject<number>;
  pagesOutput: Observable<any>;
  numberOfPages: Observable<number>;

  constructor(private http: HttpClient) {
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey',this.apiKey )
          .set('country', this.country)
          .set('pageSize', String(this.pageSize))
          .set('page', String(page))
      }),
      
    );
   }
}
