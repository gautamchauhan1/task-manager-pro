import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  public wishlistCount$ = new BehaviorSubject<number>(0);

  addToWishList()
  {
    const counter = this.wishlistCount$.getValue();
    this.wishlistCount$.next(counter +1);
  }

  searchProducts(term:string)
  {
    if(term.toLowerCase()==='error'){
      return throwError(()=>'It is API failure, error')
    }

    if(!term.trim())
    {
      return of([]);
    }

    const items = [`Smart ${term} pro`, `${term} max Ultra`, `Affordable ${term} lite`, `${term} Refurbished`];
    return of(items).pipe(delay(1000));
  }
}
