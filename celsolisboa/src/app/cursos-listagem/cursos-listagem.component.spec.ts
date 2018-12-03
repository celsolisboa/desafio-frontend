import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosListagemComponent } from './cursos-listagem.component';

describe('CursosListagemComponent', () => {
  let component: CursosListagemComponent;
  let fixture: ComponentFixture<CursosListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
