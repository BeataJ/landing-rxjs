import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators'

interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  messages: Subject<Command>;

  constructor() { 
    this.messages = new Subject<Command>()
  }

  getMessages() {
    return this.messages.pipe(
      scan((acc, value) => {
        if (value.type === 'clear') {
          return acc.filter(message => message.id !== value.id)
        } else {
          return [...acc, value]
        }
      }, [])
    )
  }

  addSuccess(message: string) {
    this.messages.next({
      id: this.randomId(),
      type: 'success',
      text: message
    });
  }

  addError(message: string) {
    this.messages.next({
      id: this.randomId(),
      type: 'error',
      text: message
    })
  }

  clearMessage(id: number) {
    this.messages.next({
      id,
      type: 'clear'
    })
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}
