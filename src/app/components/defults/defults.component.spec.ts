import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefultsComponent } from './defults.component';

describe('DefultsComponent', () => {
  let component: DefultsComponent;
  let fixture: ComponentFixture<DefultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
