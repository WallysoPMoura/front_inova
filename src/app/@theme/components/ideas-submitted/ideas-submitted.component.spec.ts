import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasSubmittedComponent } from './ideas-submitted.component';

describe('IdeasSubmittedComponent', () => {
  let component: IdeasSubmittedComponent;
  let fixture: ComponentFixture<IdeasSubmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeasSubmittedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeasSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
