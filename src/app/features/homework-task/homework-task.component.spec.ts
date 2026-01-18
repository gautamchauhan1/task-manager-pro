import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkTaskComponent } from './homework-task.component';

describe('HomeworkTaskComponent', () => {
  let component: HomeworkTaskComponent;
  let fixture: ComponentFixture<HomeworkTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeworkTaskComponent]
    });
    fixture = TestBed.createComponent(HomeworkTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
