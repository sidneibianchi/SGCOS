/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BuscaCEPService } from './BuscaCEP.service';

describe('Service: BuscaCEP', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscaCEPService]
    });
  });

  it('should ...', inject([BuscaCEPService], (service: BuscaCEPService) => {
    expect(service).toBeTruthy();
  }));
});
