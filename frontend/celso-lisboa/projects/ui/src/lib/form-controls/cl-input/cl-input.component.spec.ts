import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClInputComponent } from './cl-input.component';

describe('ClInputComponent', () => {
  let component: ClInputComponent;
  let fixture: ComponentFixture<ClInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
