import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDefaultComponent } from './adm-default.component';

describe('AdmDefaultComponent', () => {
  let component: AdmDefaultComponent;
  let fixture: ComponentFixture<AdmDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
