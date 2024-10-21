import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingIdeasComponent } from './ranking-ideas.component';

describe('RankingIdeasComponent', () => {
  let component: RankingIdeasComponent;
  let fixture: ComponentFixture<RankingIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingIdeasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
