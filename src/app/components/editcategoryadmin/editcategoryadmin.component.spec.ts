import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcategoryadminComponent } from './editcategoryadmin.component';

describe('EditcategoryadminComponent', () => {
  let component: EditcategoryadminComponent;
  let fixture: ComponentFixture<EditcategoryadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcategoryadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcategoryadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
