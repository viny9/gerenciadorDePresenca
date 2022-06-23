import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosConfigComponent } from './horarios-config.component';

describe('HorariosConfigComponent', () => {
  let component: HorariosConfigComponent;
  let fixture: ComponentFixture<HorariosConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorariosConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
