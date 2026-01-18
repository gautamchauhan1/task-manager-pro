import { Component } from '@angular/core';
import { LifeService } from './life.service';

@Component({
  selector: 'app-lifecycle-hooks',
  templateUrl: './lifecycle-hooks.component.html',
  styleUrls: ['./lifecycle-hooks.component.scss']
})
export class LifecycleHooksComponent {


  // public Service use ki taaki HTML me use kar sakein
  constructor(public lifeService: LifeService){}

  //lifecycle hooks
    message: string = 'Learn Lifecycle hooks';
    isChildVisible: boolean = true;
    isVisible: boolean = false;

    toggleToShowChildData()
    {
      this.isVisible = !this.isVisible;
    }
  
    toggleChild(): void {
      this.isChildVisible = !this.isChildVisible;
    }

    //ngOnChanges after button click
    updateMessage(){
      this.message = 'Hi, this message from ngOnChanges'
    }
}
