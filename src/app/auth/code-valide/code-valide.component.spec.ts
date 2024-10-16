import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeValideComponent } from './code-valide.component';

describe('CodeValideComponent', () => {
  let component: CodeValideComponent;
  let fixture: ComponentFixture<CodeValideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeValideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeValideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
