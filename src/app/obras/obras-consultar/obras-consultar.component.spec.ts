import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrasConsultarComponent } from './obras-consultar.component';

describe('ObrasConsultarComponent', () => {
  let component: ObrasConsultarComponent;
  let fixture: ComponentFixture<ObrasConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObrasConsultarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrasConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
