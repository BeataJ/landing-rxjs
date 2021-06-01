import { Injectable } from '@angular/core';
import { environment } from 'environment'

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private url = '';
  private pageSize = 10;
  private apiKey = environment.apiNewsKey;
  private country = '';

  constructor() { }
}
