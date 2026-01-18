import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBehsubComponent } from './sub-behsub.component';

describe('SubBehsubComponent', () => {
  let component: SubBehsubComponent;
  let fixture: ComponentFixture<SubBehsubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubBehsubComponent]
    });
    fixture = TestBed.createComponent(SubBehsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
