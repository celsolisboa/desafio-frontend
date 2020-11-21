import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClButtonComponent } from './cl-button.component';

describe('ClButtonComponent', () => {
  let component: ClButtonComponent;
  let fixture: ComponentFixture<ClButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
