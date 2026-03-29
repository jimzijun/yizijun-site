import { TestBed } from '@angular/core/testing';

import { P5CirclesComponent } from './p5-circles.component';

describe('P5CirclesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [P5CirclesComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(P5CirclesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
