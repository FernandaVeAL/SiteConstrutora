import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrasCadastrarComponent } from './obras-cadastrar.component';

describe('ObrasCadastarComponent', () => {
  let component: ObrasCadastrarComponent;
  let fixture: ComponentFixture<ObrasCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObrasCadastrarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrasCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
