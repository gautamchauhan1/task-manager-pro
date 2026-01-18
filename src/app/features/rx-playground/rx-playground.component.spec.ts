import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxPlaygroundComponent } from './rx-playground.component';

describe('RxPlaygroundComponent', () => {
  let component: RxPlaygroundComponent;
  let fixture: ComponentFixture<RxPlaygroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RxPlaygroundComponent]
    });
    fixture = TestBed.createComponent(RxPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
