/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InqueritoService } from './Inquerito.service';

describe('Service: Inquerito', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InqueritoService]
    });
  });

  it('should ...', inject([InqueritoService], (service: InqueritoService) => {
    expect(service).toBeTruthy();
  }));
});
