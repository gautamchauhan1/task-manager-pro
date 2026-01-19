import { Component } from '@angular/core';

@Component({
  selector: 'app-crud-app',
  templateUrl: './crud-app.component.html',
  styleUrls: ['./crud-app.component.scss']
})
export class CrudAppComponent {
isFormVisible: boolean =false;
toggleForm()
{
  this.isFormVisible = !this.isFormVisible;
  this.tasktoEdit = null;
}

tasktoEdit:any= null;

loadTask(task:any)
{
  this.tasktoEdit = task;
  this.isFormVisible = true;
}


}
