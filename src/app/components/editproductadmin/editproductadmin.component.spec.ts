import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproductadminComponent } from './editproductadmin.component';

describe('EditproductadminComponent', () => {
  let component: EditproductadminComponent;
  let fixture: ComponentFixture<EditproductadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditproductadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditproductadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
