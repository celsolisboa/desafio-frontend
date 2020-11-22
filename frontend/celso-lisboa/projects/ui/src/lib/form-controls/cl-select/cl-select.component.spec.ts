import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClSelectComponent } from './cl-select.component';

describe('ClSelectComponent', () => {
  let component: ClSelectComponent;
  let fixture: ComponentFixture<ClSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
