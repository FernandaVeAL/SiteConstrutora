import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosConsultarComponent } from './usuarios-consultar.component';

describe('UsuariosConsultarComponent', () => {
  let component: UsuariosConsultarComponent;
  let fixture: ComponentFixture<UsuariosConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosConsultarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
