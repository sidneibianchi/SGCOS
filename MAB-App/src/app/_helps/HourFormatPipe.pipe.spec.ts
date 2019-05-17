/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { HourFormatPipePipe } from './HourFormatPipe.pipe';
import { Constants } from '../util/Constants';

describe('Pipe: HourFormatPipee', () => {
  it('create an instance', () => {
    let pipe = new HourFormatPipePipe(Constants.TIME_FMT);
    expect(pipe).toBeTruthy();
  });
});
