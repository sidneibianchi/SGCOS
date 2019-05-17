/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AutosbuscaComponent } from './autosbusca.component';

describe('AutosbuscaComponent', () => {
  let component: AutosbuscaComponent;
  let fixture: ComponentFixture<AutosbuscaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutosbuscaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutosbuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
