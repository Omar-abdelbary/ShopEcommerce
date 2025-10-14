import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersaleitemComponent } from './usersaleitem.component';

describe('UsersaleitemComponent', () => {
  let component: UsersaleitemComponent;
  let fixture: ComponentFixture<UsersaleitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersaleitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersaleitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
