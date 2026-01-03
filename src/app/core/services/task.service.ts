import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private initialTasks: Task[] = [
    { id: 1, title: 'Learn Angular 16', isCompleted: false },
    { id: 2, title: 'Build Project', isCompleted: false }
  ];

  // Ye State Manager hai (Data Store)
  private taskSubject = new BehaviorSubject<Task[]>(this.initialTasks);
  
  // Isko components use karenge data dekhne ke liye
  tasks$ = this.taskSubject.asObservable();

  constructor() { }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      isCompleted: false
    };
    const updatedTasks = [...this.taskSubject.value, newTask];
    this.taskSubject.next(updatedTasks);
  }

  deleteTask(id: number) {
    const updatedTasks = this.taskSubject.value.filter(task => task.id !== id);
    this.taskSubject.next(updatedTasks);
  }
}