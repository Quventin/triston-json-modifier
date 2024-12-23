import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSourceComponent } from './load-source.component';

describe('LoadSourceComponent', () => {
  let component: LoadSourceComponent;
  let fixture: ComponentFixture<LoadSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadSourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
