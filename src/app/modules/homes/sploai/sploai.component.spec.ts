import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SploaiComponent } from './sploai.component';

describe('SploaiComponent', () => {
  let component: SploaiComponent;
  let fixture: ComponentFixture<SploaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SploaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SploaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
