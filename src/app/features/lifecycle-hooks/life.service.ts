import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LifeService {

  // Service simple function
  getHelloMessage() {
    return "Life Service Injected via constructor 🚀";
  }

  // 'public' isliye rakha taki component direct access kar sake
  // public username$ = new Subject<string>();
  public username$ = new BehaviorSubject<string>('hello Observer');

  // 2. Naam change karne ka function
  changeName(newName: string)
  {
    this.username$.next(newName);
  }

  constructor() { }
}
