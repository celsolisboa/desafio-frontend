import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRoundedComponent } from './button-rounded.component';

describe('ButtonRoundedComponent', () => {
  let component: ButtonRoundedComponent;
  let fixture: ComponentFixture<ButtonRoundedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonRoundedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRoundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
