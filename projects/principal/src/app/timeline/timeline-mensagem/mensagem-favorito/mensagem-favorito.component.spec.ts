import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemFavoritoComponent } from './mensagem-favorito.component';

describe('MensagemFavoritoComponent', () => {
  let component: MensagemFavoritoComponent;
  let fixture: ComponentFixture<MensagemFavoritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensagemFavoritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemFavoritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
