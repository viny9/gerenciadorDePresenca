import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTurmaComponent } from './update-turma.component';

describe('UpdateTurmaComponent', () => {
  let component: UpdateTurmaComponent;
  let fixture: ComponentFixture<UpdateTurmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTurmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTurmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
