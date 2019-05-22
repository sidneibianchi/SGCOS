/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChamadoService } from './Chamado.service';

describe('Service: Chamado', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChamadoService]
    });
  });

  it('should ...', inject([ChamadoService], (service: ChamadoService) => {
    expect(service).toBeTruthy();
  }));
});
