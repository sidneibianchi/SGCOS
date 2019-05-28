/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EquipamentoService } from './Equipamento.service';

describe('Service: Equipamento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipamentoService]
    });
  });

  it('should ...', inject([EquipamentoService], (service: EquipamentoService) => {
    expect(service).toBeTruthy();
  }));
});
