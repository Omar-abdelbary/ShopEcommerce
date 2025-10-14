import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesadminComponent } from './categoriesadmin.component';

describe('CategoriesadminComponent', () => {
  let component: CategoriesadminComponent;
  let fixture: ComponentFixture<CategoriesadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
