import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsMapPage } from './lots-map.page';

describe('LotsMapPage', () => {
  let component: LotsMapPage;
  let fixture: ComponentFixture<LotsMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotsMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotsMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
