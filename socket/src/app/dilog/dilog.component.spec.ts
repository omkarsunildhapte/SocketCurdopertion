import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilogComponent } from './dilog.component';

describe('DilogComponent', () => {
  let component: DilogComponent;
  let fixture: ComponentFixture<DilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
