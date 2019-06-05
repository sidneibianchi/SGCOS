/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClicadeditComponent } from './clicadedit.component';

describe('ClicadeditComponent', () => {
  let component: ClicadeditComponent;
  let fixture: ComponentFixture<ClicadeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClicadeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClicadeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
