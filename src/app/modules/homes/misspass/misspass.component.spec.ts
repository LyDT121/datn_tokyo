import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisspassComponent } from './misspass.component';

describe('MisspassComponent', () => {
  let component: MisspassComponent;
  let fixture: ComponentFixture<MisspassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisspassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisspassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
