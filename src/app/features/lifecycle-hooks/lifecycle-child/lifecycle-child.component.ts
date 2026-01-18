import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LifeService } from '../life.service';

@Component({
  selector: 'app-lifecycle-child',
  templateUrl: './lifecycle-child.component.html',
  styleUrls: ['./lifecycle-child.component.scss']
})
export class LifecycleChildComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() parentData: string = '';
  @ViewChild('myInputBox') inputBox!: ElementRef; 


  title: string;
  serviceMessage: string ='';

  updateName(uName: string)
  {
    if(uName !== '')
    {
    this.lifeService.changeName(uName);
    console.log(uName);
    
    }
  }

    constructor(private lifeService: LifeService) {
      console.log('1. Constructor Called');
      this.title= 'Variable intilization by constructor';
      console.log('service is ready:', this.lifeService);
      }
  
      ngOnChanges(changes: SimpleChanges): void {
      console.log('2. ngOnChanges Called', changes);
    }
  
    ngOnInit(): void {
      console.log('3. ngOnInit Called');
      // Best Practice: Service ka use yahan karo
      this.serviceMessage = this.lifeService.getHelloMessage();
      console.log(this.serviceMessage);
      
    }
  
    ngDoCheck(): void {
      console.log('4. ngDoCheck Called');
    }
  
    ngAfterContentInit(): void {
      console.log('5. ngAfterContentInit Called');
    }
  
    ngAfterContentChecked(): void {
      console.log('6. ngAfterContentChecked Called');
    }
  
    ngAfterViewInit(): void {
      console.log('7. ngAfterViewInit Called: Html fully load in browser');

      // 2. Ab hum us element ka color aur focus change kar sakte hain
    // Ye code ngOnInit me kaam NAHI karta (Error deta)
    this.inputBox.nativeElement.style.backgroundColor = '#0c0c0cff'; // black
    this.inputBox.nativeElement.style.color = '#fff';
    this.inputBox.nativeElement.focus(); // Cursor yahan aa jayega
    
    console.log('DOM Manipulation Done via ViewChild!');
    }
  
    ngAfterViewChecked(): void {
      console.log('8. ngAfterViewChecked Called');
    }
  
    ngOnDestroy(): void {
      console.log('9. ngOnDestroy Called');

    }
  

}
