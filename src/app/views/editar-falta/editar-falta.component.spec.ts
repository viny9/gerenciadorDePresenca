import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFaltaComponent } from './editar-falta.component';

describe('EditarFaltaComponent', () => {
  let component: EditarFaltaComponent;
  let fixture: ComponentFixture<EditarFaltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarFaltaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
