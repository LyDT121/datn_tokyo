import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuahangComponent } from './cuahang.component';

describe('CuahangComponent', () => {
  let component: CuahangComponent;
  let fixture: ComponentFixture<CuahangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuahangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuahangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
