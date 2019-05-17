/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InqueritosComponent } from './inqueritos.component';

describe('InqueritosComponent', () => {
  let component: InqueritosComponent;
  let fixture: ComponentFixture<InqueritosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InqueritosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InqueritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
