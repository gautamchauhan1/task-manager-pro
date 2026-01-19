import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';


export interface TaskItem {
id?: number;
title: string;
dueDate: string;
priority: string;
}

export interface Task {
id?: number;
title: string;
description?: string;
dueDate: string;
priority: string;
email: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient){}

  // GET request
  getAllTasks(): Observable<TaskItem[]>{
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  // POST request
  addTask(task:any): Observable<TaskItem>{
    return this.http.post<TaskItem>(this.apiUrl, task);
  }

  //DELETE task
  deleteTask(id:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
    //http://localhost:3000/tasks/1
  }

  // UPDATE task
  updateTask(id:number, task:any): Observable<TaskItem>{
    return this.http.put<TaskItem>(`${this.apiUrl}/${id}`, task)
  }
}