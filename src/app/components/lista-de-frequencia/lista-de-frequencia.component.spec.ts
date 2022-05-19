import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeFrequenciaComponent } from './lista-de-frequencia.component';

describe('ListaDeFrequenciaComponent', () => {
  let component: ListaDeFrequenciaComponent;
  let fixture: ComponentFixture<ListaDeFrequenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeFrequenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeFrequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
