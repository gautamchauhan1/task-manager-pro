import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleChildComponent } from './lifecycle-child.component';

describe('LifecycleChildComponent', () => {
  let component: LifecycleChildComponent;
  let fixture: ComponentFixture<LifecycleChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LifecycleChildComponent]
    });
    fixture = TestBed.createComponent(LifecycleChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
