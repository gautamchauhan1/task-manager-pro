import { Component } from '@angular/core';
import { TaskService, Task } from '../../core/services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  // Data ko hold karne ke liye Observable variable ($ sign convention hai)
  taskList$: Observable<Task[]>;

  // Constructor me Service maangi (DI)
  constructor(private taskService: TaskService) {
    // Service se data lekar variable me daal diya
    this.taskList$ = this.taskService.tasks$;
  }

  // Delete button dabane par ye chalega
  onDelete(id: number) {
    this.taskService.deleteTask(id);
  }
}