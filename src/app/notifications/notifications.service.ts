import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  messages: Subject<any>;

  constructor() { }

  addSuccess(message: string) {}

  addError(message: string) {}

  clearMessage(id: number) {}
}
