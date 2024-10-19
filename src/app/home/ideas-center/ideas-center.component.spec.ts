import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasCenterComponent } from './ideas-center.component';

describe('IdeasCenterComponent', () => {
  let component: IdeasCenterComponent;
  let fixture: ComponentFixture<IdeasCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeasCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeasCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
