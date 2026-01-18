import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-sub-behsub',
  templateUrl: './sub-behsub.component.html',
  styleUrls: ['./sub-behsub.component.scss']
})
export class SubBehsubComponent {

  constructor(){}

  // Isme koi initial value nahi hoti
  private mySubject = new Subject<string>();
  private myBehaviorSubject = new BehaviorSubject<string>('Initial Value');
  
  logs: string[] =[];
  // --- DEMO 1: Subject (The Bhulakkad) ---
  runSubjectDemo() {
    this.logs =[];
    this.logs.push('--- Subject Demo Started ---');

    // 1. Data Bheja (Subscriber aane se PEHLE) -> Ye Miss ho jayega
    this.mySubject.next('Data 1 (missed before coming of subscriber)');

    // 2. Ab Subscriber aaya (Late Subscriber)
    this.mySubject.subscribe(val => {
      this.logs.push(`Subject mila: ${val}`);
      console.log(this.logs);
      
    });
    // 3. Data Bheja (Subscriber aane ke BAAD) -> Ye milega
    this.mySubject.next('Data 2 (Received)');
  }
  
  // --- DEMO 2: BehaviorSubject (The Smart Memory) ---
  runBehaviorSubjectDemo() {
    this.logs = []; // Purane logs saaf karein
    this.logs.push('--- BehaviorSubject Demo Started ---');

    // 1. Data Bheja (Subscriber aane se PEHLE)
    this.myBehaviorSubject.next('Data 1 (first Value)');
    this.myBehaviorSubject.next('Data 2 (Last Value)');
    // 2. Ab Subscriber aaya (Late Subscriber)
    // Jadoo: Subscribe karte hi isko 'Data 2' mil jayega! jo ki last data h
    this.myBehaviorSubject.subscribe(val => {
      this.logs.push(`BehaviorSubject mila: ${val}`);
      console.log(this.logs);
      
    });

    // 3. Naya Data Bheja
    this.myBehaviorSubject.next('Data 3 (New)');
  }
  
  }
  