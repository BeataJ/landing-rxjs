import { Injectable } from '@angular/core';
import { environment } from 'environment'

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = environment.apiNewsKey;
  private country = 'ca';

  constructor() { }
}
