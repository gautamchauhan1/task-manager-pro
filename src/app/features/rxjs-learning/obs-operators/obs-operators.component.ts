import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, debounceTime, delay, distinctUntilChanged, exhaustMap, filter, finalize, forkJoin, from, fromEvent, interval, map, of, Subject, Subscription, switchMap, take, takeUntil, tap, throwError, timer } from 'rxjs';

@Component({
  selector: 'app-obs-operators',
  templateUrl: './obs-operators.component.html',
  styleUrls: ['./obs-operators.component.scss']
})
export class ObsOperatorsComponent implements OnInit, OnDestroy, AfterViewInit {

 @Input() parentData: string = '';

  errorMessage = ' ';

   constructor() {
    }
    
  ngOnInit(): void {
    this.learnexhaustMap();
    this.learnforkJoin();
    this.debounceTimeDistinctUntilChanged();
    this.learnCombineLatest();
  }

    //fake api for ExhaustMap
    saveDataApi()
    {
      console.log('Saving started wait for 5 seconds');
      return of('Data saved successfully').pipe(delay(5000));
    }


  //fake api for CatchError
  fakeApi(searchTerm: string) {
  if(searchTerm ==='fail')
  {
    return throwError(()=> 'Server failed');
  }

  return of(`Data for: ${searchTerm}`).pipe(
    delay(2000) // 2 second traffic - 2 second late response
  );
}


  learnCombineLatest()
  {

    const color$ = new BehaviorSubject('Red');
    const size$ = new BehaviorSubject('small');

    combineLatest([color$, size$]).subscribe(([col, siz])=>
    {
      console.log(`New T-shirt combination color: ${col} and size: ${siz}`);
      
    })

    setTimeout(()=>
      {
        color$.next('Blue');
        // Output: "Color=Blue, Size=Small" (Purana Size use kiya)
      }, 2000);

      setTimeout(()=>
      {
        size$.next('Medium')
        // Output: "Color=Blue, Size=Large" (Purana Color use kiya)
      }, 4000)
  }


  learnexhaustMap()
  {

    const saveBtn = document.getElementById('save-btn')!;

    fromEvent(saveBtn, 'click').pipe(
      tap(()=> console.log('Button cliked')),
      exhaustMap(()=> this.saveDataApi())
    ).subscribe((res)=>
    console.log(res)
    )
  }

  debounceTimeDistinctUntilChanged(){
    const searchBox = document.getElementById('search-box') as HTMLInputElement;

    fromEvent(searchBox, 'input').pipe(
      map((event:any)=> event.target.value),
      debounceTime(1000),
      distinctUntilChanged(),
      //use of catachError
      switchMap((searchTerm)=> this.fakeApi(searchTerm).pipe(
        catchError((err) =>
        {
          this.errorMessage = err;
          return of('Error Handled');
        })
      ))
    ).subscribe(res=>
    {
      console.log('Final result :', res); 
      this.errorMessage='';
    }
    )

  }


  learnforkJoin()
  {

    const startTime=  Date.now();
    const user1$ = of({name:'Gautam', age:33}).pipe(delay(2000));
    const settings$ = of({theme: 'Dark Theme', notifications: true}).pipe(delay(4000));

    forkJoin([user1$, settings$]).subscribe
    (
      (results)=>
      {
        const endTime = Date.now();
        console.log(`API loads in ${startTime-endTime/1000} seconds`);
        console.log(`User Data: `, results[0]);
        console.log(`Settings data: `,results[1]);
    }
  )

  }

    // switchMap
    // 1. Fake API (Nakli Server)
getDataFromApi(searchTerm: string) {
  return of(`Data for: ${searchTerm}`).pipe(
    delay(2000) // 2 second traffic - 2 second late response
  );
}

  ngAfterViewInit(): void {
      // Input box ko pakda
  const searchInput = document.querySelector('input') as HTMLInputElement;

    // ... API call for data and switchMap code ...

fromEvent(searchInput, 'keyup').pipe( // 2. Mike lagaya
  
  debounceTime(500), // 3. Waiter: "Ruko, user ko type karne do"

  //Event object me se value nikalo
  map((event:any)=> event.target.value),
  filter((text)=> text.trim() !==''),
  map(d=> d.toUpperCase()),
  tap(data => console.log(`tap data: ${data}`)), // 4. Spy: Sirf check kiya kya type hua and check krega ki wo event h ya string h

  switchMap((term) => this.getDataFromApi(term)), // 5. Manager: Purana order cancel, naya process karo
  takeUntil(this.destroy$) // "Tab tak chalo jab tak destroy$ signal na mile"
).subscribe({
  next: (data)=>
  {
// Ye tabhi chalega jab request cancel nahi hui
        console.log('API Call response:', data); 

  }
})

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  mySubscription: Subscription | undefined;

  private destroy$ = new Subject<void>();

  myNumbers$ = interval(1000).pipe(take(20));

  // 'of' operator
  showOfDemo()
  {
    console.log('---of operator---');
    const obs$ = of(['A','B','C']);
    obs$.subscribe(val=>
    {
      console.log('of result:',val);
    }
    )
  }
      showFromDemo()
    {
      console.log('---from operator---');
    const obs$ = from(['A','B','C']);
    obs$.subscribe(val=>
    {
      console.log('from result:',val);
    }
    )
    }

    // Interval Demo
    startInterval()
    {
      console.log('--- Interval Started ---');

      interval(1000).pipe(
        // 2. Ye line ka matlab: "Jab destroy$ signal de, to isko band kar do"
        takeUntil(this.destroy$),
        // Jaise hi ye interval band hoga, finalize wala code chal jayega
      finalize(() => console.log('Interval Safely Stopped! ✅'))
      ).subscribe(val=>
      {
        console.log(val);
      }
      )

    }

    // --- TIMER DEMO ---
    startTimer()
    {
      console.log('--Timer Started---');

      timer(3000).pipe(
        takeUntil(this.destroy$)
      ).subscribe(val=>
      {
        console.log(val);
      }
      )      
    }


        //manuall unsubscribe
    // stopInterval()
    // {
    //   if(this.mySubscription)
    //   {
    //     this.mySubscription.unsubscribe();
    //     console.log('interval stopped'); 
    //     this.mySubscription= undefined;
    //   }
    // }

    //manuall stop timer
    // stopTimer()
    // {
    //   console.log('Timer has been stopped');    
    //   this.mySubscription?.unsubscribe();
    // }
}
