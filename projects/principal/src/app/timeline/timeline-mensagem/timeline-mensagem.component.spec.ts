import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineMensagemComponent } from './timeline-mensagem.component';

describe('TimelineMensagemComponent', () => {
  let component: TimelineMensagemComponent;
  let fixture: ComponentFixture<TimelineMensagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineMensagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
