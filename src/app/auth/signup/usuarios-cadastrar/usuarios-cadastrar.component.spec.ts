import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosCadastrarComponent } from './usuarios-cadastrar.component';

describe('UsuariosCadastrarComponent', () => {
  let component: UsuariosCadastrarComponent;
  let fixture: ComponentFixture<UsuariosCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosCadastrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
