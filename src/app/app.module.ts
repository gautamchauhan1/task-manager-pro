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

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskAddComponent,
    RxPlaygroundComponent,
    LifecycleHooksComponent,
    LifecycleChildComponent,
    HomeworkTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxjsLearningModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
