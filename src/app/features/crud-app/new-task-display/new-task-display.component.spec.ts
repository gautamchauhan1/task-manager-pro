import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskDisplayComponent } from './new-task-display.component';

describe('NewTaskDisplayComponent', () => {
  let component: NewTaskDisplayComponent;
  let fixture: ComponentFixture<NewTaskDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTaskDisplayComponent]
    });
    fixture = TestBed.createComponent(NewTaskDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
