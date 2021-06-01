import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Subject, Observable } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

interface NewsApiResponse {
  totalResults: number;
  articles: {
    title: string;
    url: string;
  }[]
}

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
  numberOfPages: Subject<number>;

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject();

    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey',this.apiKey )
          .set('country', this.country)
          .set('pageSize', String(this.pageSize))
          .set('page', String(page))
      }),
      switchMap((params) => {
        return this.http.get<NewsApiResponse>(this.url, { params });
      })
    );
   }
}
