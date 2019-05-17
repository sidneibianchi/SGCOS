/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DateFormatPipePipe } from './DateFormatPipe.pipe';
import { Constants } from '../util/Constants';

describe('Pipe: DateFormatPipee', () => {
  it('create an instance', () => {
    let pipe = new DateFormatPipePipe(Constants.DATE_FMT);
    expect(pipe).toBeTruthy();
  });
});
