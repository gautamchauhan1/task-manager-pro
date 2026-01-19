import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './features/task-list/task-list.component';
import { TaskAddComponent } from './features/task-add/task-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxPlaygroundComponent } from './features/rx-playground/rx-playground.component';
import { RxjsLearningModule } from './features/rxjs-learning/rxjs-learning.module';
import { LifecycleHooksComponent } from './features/lifecycle-hooks/lifecycle-hooks.component';
import { LifecycleChildComponent } from './features/lifecycle-hooks/lifecycle-child/lifecycle-child.component';
import { HomeworkTaskComponent } from './features/homework-task/homework-task.component';
import {HttpClientModule} from '@angular/common/http';
import { CrudAppComponent } from './features/crud-app/crud-app/crud-app.component';
import { NewTaskFormComponent } from './features/crud-app/new-task-form/new-task-form.component';
import { NewTaskDisplayComponent } from './features/crud-app/new-task-display/new-task-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskAddComponent,
    RxPlaygroundComponent,
    LifecycleHooksComponent,
    LifecycleChildComponent,
    HomeworkTaskComponent,
    CrudAppComponent,
    NewTaskFormComponent,
    NewTaskDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxjsLearningModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
