import { TestBed } from '@angular/core/testing';

import { MensagemFavoritoService } from './mensagem-favorito.service';

describe('MensagemFavoritoService', () => {
  let service: MensagemFavoritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensagemFavoritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
