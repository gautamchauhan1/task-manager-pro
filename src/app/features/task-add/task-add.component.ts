import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})

export class TaskAddComponent implements OnInit {

  taskForm!: FormGroup;
  constructor(private fb: FormBuilder, private taskService: TaskService){}

  @Output() closeForm = new EventEmitter<void>();

  ngOnInit(): void {
    this.initForm();
    this.handleMeetingChange();
    this.fn_valueChanges();
  }


  //ValueChanges
  fn_valueChanges(){

    this.taskForm.get('priority')?.valueChanges.subscribe((changedValue)=>
    {
      const dateControl = this.taskForm.get('dueDate');
      if(changedValue==='high')
      {
        dateControl?.setValidators([Validators.required]);
      }
      else{
        dateControl?.clearValidators();
      }

      dateControl?.updateValueAndValidity();
    })

  }

  initForm()
  {
    this.taskForm = this.fb.group({
      // Syntax: ['InitialValue', [Validators]]
      title: ['', [Validators.required, Validators.minLength(5), noTestWordValidator]],
      description: [],
      dueDate: ['', Validators.required],
      priority: ['low', [Validators.required]], // Default value 'low'
      isMeeting: [false],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      meetingLink:[''], // no validation at initial
      subTasks: this.fb.array([]), // empty array
    },
    {validators: emailMatchValidator});
  }

  editFormData(){

    
  const apiData = {
    title: 'Complete project',
    description: 'Submit before Saturday',
    dueDate: '2026-01-12',
    priority: 'medium',
    //we make some fields empty
    subtasks :['create API', 'Test UI', 'Check pathValue']
  }

  //setValue 
//  try{
//   this.taskForm.setValue(apiData);
//  }
//  catch (error){
//   console.log('Setvalue error', error);
//   alert('SetValue failed while fetching the data');
//  }

// patchValue
this.taskForm.patchValue(apiData);
console.log(apiData);
// this.subTasksArray.clear();
// apiData.subtasks.forEach((taskName)=>
// {
//   const newControl = new FormControl('', Validators.required);
//   this.subTasksArray.push(newControl);
// })

alert('Data loaded successfully')

  }

  // for Dyanamic Validations, valueChanges
  handleMeetingChange(){
    const isMeetingControl = this.taskForm.get('isMeeting');
    const linkControl = this.taskForm.get('meetingLink');

    isMeetingControl?.valueChanges.subscribe((isChecked: boolean)=>
    {
      if(isChecked)
      {
        linkControl?.setValidators([Validators.required]);
      }
      else
      {
        linkControl?.clearValidators();
        linkControl?.setValue('');
      }

      linkControl?.updateValueAndValidity(); // it is important to apply
    })
  }

  // FormArray, FormControl
  // 👇 GETTER: Ye HTML ko batata hai ki 'subTasks' ek Array hai
  get subTasksArray()
  {
    return this.taskForm.get('subTasks') as FormArray
  }

  addSubTask()
  {
  const newSubTask = new FormControl('', Validators.required);
  this.subTasksArray.push(newSubTask);
  }

  removeSubTask(index: number)
  {
    this.subTasksArray.removeAt(index);
  }

  // Form Submit
  onSubmit(){
    if(this.taskForm.valid)
    {
      console.log('form submitted', this.taskForm.value);
      
      this.taskService.addTask(this.taskForm.value).subscribe({
        next: (res)=>
        {
          console.log('Data saved', res);
          this.taskForm.reset();
          this.taskForm.get('priority')?.setValue('low');
          this.subTasksArray.clear();     
          // 👇 Save hone ke baad Parent ko signal bhejo
          this.closeForm.emit();     
        },
        error: (err)=>
        {
          console.log('Server error', err);
          alert('Check ApI server');         
        }
      })

    }
    else
    {
      console.log('form invalid');
      // Form ke sare controls ko 'touched' mark kar do taaki errors dikh jaye

      this.taskForm.markAllAsTouched();   
    }
  }

  onCancel()
{
  this.closeForm.emit();
}

}

// from custome Validators functions

// title word 'test' checking validator
export function noTestWordValidator(control: AbstractControl): ValidationErrors | null {

  const value = control.value as string;

  if(value && value.toLocaleLowerCase().includes('test')){
    return {'testwordError': true} // test word error
  }

  return null; // alright
}

// function for email mismatch checking

export function emailMatchValidator(control: AbstractControl): ValidationErrors | null{

  
    const email = control.get('email')?.value;
    const confirmEmail = control.get('confirmEmail')?.value

    if(email && confirmEmail && email !== confirmEmail)
    {
      return {'EmailMismatch': true};
    }

  return null;
}