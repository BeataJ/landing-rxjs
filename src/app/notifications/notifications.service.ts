import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  messages: Subject<Command>;

  constructor() { 
    this.messages = new Subject<Command>()
  }

  addSuccess(message: string) {
    this.messages.next(message);
  }

  addError(message: string) {
    this.messages.next(message)
  }

  clearMessage(id: number) {}
}
