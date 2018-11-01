import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandingTableComponent } from './expanding-table.component';

describe('ExpandingTableComponent', () => {
  let component: ExpandingTableComponent;
  let fixture: ComponentFixture<ExpandingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
