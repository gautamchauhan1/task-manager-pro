import { Component } from '@angular/core';
import { filter, from, interval, map, take } from 'rxjs';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})
export class MapFilterComponent {

  // Logs dikhane ke liye do alag arrays
  numLogs : string[] = [];
  fruitLogs: string[] = [];

  // Numbers Transformation 
  startNumberGame(){
    this.numLogs = [];
    this.numLogs.push('Game Started: Generating numbers every 1 second...');

    // 1. interval(1000): Har 1 sec me number dega (0, 1, 2, 3...)
    // 2. pipe(): Ye wo pipeline hai jisme hum operators lagate hain

    interval(1000).pipe(
      take(10), // Sirf 10 tak ginti
      filter(num=> num>0),
      filter(num=> num % 2 === 0), // Sirf EVEN (=== use kiya strict check ke liye)
      map(num=> `Number ${num} Square : ${num * num}`) // Transform kiya
        ).subscribe(res =>
    {
      this.numLogs.push(res);
      console.log(res);
    }
    ) 
  }

  // 2. String Transformation (Text logic)

  runFruitLogic()
  {
    this.fruitLogs=[];
    const fruits =['Banana', 'Pineapple', 'strawberry', 'apple', 'date'];

    from(fruits).pipe(
      filter(f=> f.length>5), // Sirf lambe naam wale fruits
      map(f=> f.toUpperCase()), // Capital letter mein badlo
      map(f=> `Premium Fruit ${f}`) // Ek extra text add kiya
    ).subscribe(res=>
    {
      this.fruitLogs.push(res);   
      console.log(res);
    }
    )
  }

}
