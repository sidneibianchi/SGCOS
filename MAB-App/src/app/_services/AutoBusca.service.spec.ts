/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutoBuscaService } from './AutoBusca.service';

describe('Service: AutoBusca', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoBuscaService]
    });
  });

  it('should ...', inject([AutoBuscaService], (service: AutoBuscaService) => {
    expect(service).toBeTruthy();
  }));
});
