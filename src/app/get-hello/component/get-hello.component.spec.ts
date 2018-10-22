import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHelloComponent } from './get-hello.component';

describe('GetHelloComponent', () => {
  let component: GetHelloComponent;
  let fixture: ComponentFixture<GetHelloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetHelloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
