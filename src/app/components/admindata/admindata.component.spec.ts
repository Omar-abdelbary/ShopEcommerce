import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindataComponent } from './admindata.component';

describe('AdmindataComponent', () => {
  let component: AdmindataComponent;
  let fixture: ComponentFixture<AdmindataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmindataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmindataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
