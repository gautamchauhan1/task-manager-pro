import { Component, OnDestroy, OnInit } from '@angular/core';
import { concatMap, delay, fromEvent, map, mergeMap, of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-merge-concat-switch-map',
  templateUrl: './merge-concat-switch-map.component.html',
  styleUrls: ['./merge-concat-switch-map.component.scss']
})
export class MergeConcatSwitchMapComponent implements OnInit, OnDestroy{


  mergeCount =0;
  concatCount = 0;
  switchCount = 0;

  // Fake API (2 second delay)
  getData(data: string)
  { 
    return of(data).pipe(
      delay(2000)
    )
  }

  private destory$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  ngOnInit(): void {
    // 1. MergeMap: (it takes all request Parallel)
    fromEvent(document.getElementById('merge-el')!, 'click').pipe(
      map(()=> 
      {
        this.mergeCount++;
        return 'Marge Click number = ' + this.mergeCount;
      }),
      mergeMap((data)=> this.getData(data)),
      takeUntil(this.destory$)
    ).subscribe(res=> console.log(res)
    );


    //2. concatMap (Data in Queue)
        fromEvent(document.getElementById('concat-el')!, 'click').pipe(
      map(()=> {
        this.concatCount++;
        return 'Concat Click number = ' + this.concatCount;
            }),
      concatMap((data)=> this.getData(data)),
      takeUntil(this.destory$)
    ).subscribe(res=> console.log(res)
    );

    //3. switchMap (Latest api data)

    fromEvent(document.getElementById('switch-el')!, 'click').pipe(
      map(()=> {
        this.switchCount++;
        return 'switchMap final Click number = ' + this.switchCount;
      }),
      switchMap((data)=> this.getData(data)),
      takeUntil(this.destory$),
    ).subscribe(res=> console.log(res)
    );

  }

}
