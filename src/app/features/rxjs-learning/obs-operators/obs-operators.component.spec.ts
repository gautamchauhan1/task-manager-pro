import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsOperatorsComponent } from './obs-operators.component';

describe('ObsOperatorsComponent', () => {
  let component: ObsOperatorsComponent;
  let fixture: ComponentFixture<ObsOperatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObsOperatorsComponent]
    });
    fixture = TestBed.createComponent(ObsOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
