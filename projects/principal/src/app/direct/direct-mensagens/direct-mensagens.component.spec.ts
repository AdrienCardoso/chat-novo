import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMensagensComponent } from './direct-mensagens.component';

describe('DirectMensagensComponent', () => {
  let component: DirectMensagensComponent;
  let fixture: ComponentFixture<DirectMensagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectMensagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectMensagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
