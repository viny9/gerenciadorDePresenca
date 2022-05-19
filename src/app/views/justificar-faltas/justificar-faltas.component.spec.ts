import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificarFaltasComponent } from './justificar-faltas.component';

describe('JustificarFaltasComponent', () => {
  let component: JustificarFaltasComponent;
  let fixture: ComponentFixture<JustificarFaltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustificarFaltasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificarFaltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
