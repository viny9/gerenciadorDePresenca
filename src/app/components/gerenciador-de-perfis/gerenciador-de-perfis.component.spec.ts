import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorDePerfisComponent } from './gerenciador-de-perfis.component';

describe('GerenciadorDePerfisComponent', () => {
  let component: GerenciadorDePerfisComponent;
  let fixture: ComponentFixture<GerenciadorDePerfisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciadorDePerfisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciadorDePerfisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
