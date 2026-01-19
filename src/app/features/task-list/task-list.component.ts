import { Component, OnInit } from '@angular/core';
import { TaskService, TaskItem } from '../../core/services/task.service'; 

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  // ✅ Array data hold karega
  tasks: TaskItem[] = []; 

  showTaskForm: boolean = false; // to hide and show Form

  // Constructor me Service mangi
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadFormTasks();
  }

  // API se data load karne ke liye
  loadFormTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log('Tasks loaded successfully from API', data);  
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
        alert('Please check if the API server is running!');      
      }
    });
  }

  // ✅ HTML me button isi naam se hona chahiye: (click)="onDelete(task.id)"
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          alert('Task deleted successfully');
          this.loadFormTasks(); // Refresh the list
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Could not delete the task.');
        }
      });
    }
  }

  openForm() {
    this.showTaskForm = true;
  }

  // 👇 EVENT HANDLER: Jab form band hoga
  closeFormAndRefresh() {
    this.showTaskForm = false; // Form chupao
    this.loadFormTasks();      // 👈 List ko Refresh karo (Taki naya added task dikhe)
  }

}