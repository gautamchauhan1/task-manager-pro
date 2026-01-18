import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, filter, fromEvent, map, of, switchMap, tap } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-homework-task',
  templateUrl: './homework-task.component.html',
  styleUrls: ['./homework-task.component.scss']
})
export class HomeworkTaskComponent implements OnInit {
  

constructor(public productService: ProductService){}

@ViewChild('inputbox', {static: true}) inputBox!: ElementRef;

 isLoading = false;
 product: string[]=[];
 errorMessage= '';

  ngOnInit(): void {
    fromEvent(this.inputBox.nativeElement, 'input').pipe(
      map((event:any)=> event.target.value),
      debounceTime(1000),
      distinctUntilChanged(),
      filter((term:string)=>
      {
        if(!term.trim())
        {
          this.isLoading= false;
          this.product =[];
          return false;
        }
        return true;
      }
    ),
      tap(()=>
      {
        this.isLoading = true;
        this.errorMessage ='';
        this.product = [];
      }),
      switchMap((term)=>
        this.productService.searchProducts(term).pipe(
          catchError((err)=>
          {
            this.errorMessage = err;
            this.isLoading= false;
            return of([]);
          })
        )
      )

    ).subscribe((data:any)=>
    {
      this.product = data;
      this.isLoading =false;
    })
  }

addWishlist(){
  this.productService.addToWishList();
}
}
