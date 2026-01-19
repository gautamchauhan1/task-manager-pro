import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss']
})
export class NewTaskFormComponent implements OnInit, OnChanges {

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService){}
  @Output() taskAdded = new EventEmitter<void>(); // to send signal to parent

  @Input() taskData: any = null;
  editId: number | null = null; // number or starting form id is null

  ngOnChanges(changes: SimpleChanges)
  {
    if(this.taskData && this.taskForm)
    {
      this.taskForm.patchValue(this.taskData);
      this.editId = this.taskData.id;
    }
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['low']
    });

    if(this.taskData)
    {
      this.taskForm.patchValue(this.taskData);
      this.editId = this.taskData.id;
    }
  }

  onSubmit(){
    if(this.taskForm.valid)
    {
      if(this.editId)
      {
        this.taskService.updateTask(this.editId, this.taskForm.value).subscribe(()=>
        {
          alert('Updated');
          this.finishEditWork();
        })
      }
      else{
      this.taskService.addTask(this.taskForm.value).subscribe({
        next:(res)=>
        {
          alert('Task saved');
          this.taskForm.reset({priority:'low'});
          this.taskAdded.emit();
          
        }
      })
      }

    }
  }

  finishEditWork()
  {
    this.taskForm.reset({priority: 'low'});
    this.taskAdded.emit();
    this.editId= null;
  }
}
