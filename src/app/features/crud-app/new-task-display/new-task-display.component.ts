import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskItem, TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-new-task-display',
  templateUrl: './new-task-display.component.html',
  styleUrls: ['./new-task-display.component.scss']
})
export class NewTaskDisplayComponent implements OnInit {


  @Output() onEdit = new EventEmitter<TaskItem>();

  tasks: TaskItem[] = [];
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        console.log('Task data accessed');

      },
      error: (err) => {
        console.log('Error', err);

      }
    })
  }

  deleteTask(id: number) {
    if (confirm('are you sure, you want to delete?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.getAllTasks()
      })
    }

  }

  editTask(task: TaskItem)
  {
    this.onEdit.emit(task); // it will send task data to parent
  }

}
