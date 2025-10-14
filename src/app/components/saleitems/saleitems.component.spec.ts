import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleitemsComponent } from './saleitems.component';

describe('SaleitemsComponent', () => {
  let component: SaleitemsComponent;
  let fixture: ComponentFixture<SaleitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleitemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
