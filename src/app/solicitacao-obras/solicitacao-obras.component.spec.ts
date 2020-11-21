import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoObrasComponent } from './solicitacao-obras.component';

describe('SolicitacaoObrasComponent', () => {
  let component: SolicitacaoObrasComponent;
  let fixture: ComponentFixture<SolicitacaoObrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoObrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
