import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMensagemComponent } from './direct-mensagem.component';

describe('DirectMensagemComponent', () => {
  let component: DirectMensagemComponent;
  let fixture: ComponentFixture<DirectMensagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectMensagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
