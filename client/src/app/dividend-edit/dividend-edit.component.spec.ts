import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendEditComponent } from './dividend-edit.component';

describe('DividendEditComponent', () => {
  let component: DividendEditComponent;
  let fixture: ComponentFixture<DividendEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividendEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividendEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
