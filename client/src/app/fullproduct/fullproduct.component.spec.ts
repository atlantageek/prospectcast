import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullproductComponent } from './fullproduct.component';

describe('FullproductComponent', () => {
  let component: FullproductComponent;
  let fixture: ComponentFixture<FullproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
