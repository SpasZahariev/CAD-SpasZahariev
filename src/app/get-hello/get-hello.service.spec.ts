import { TestBed } from '@angular/core/testing';

import { GetHelloService } from './get-hello.service';

describe('GetHelloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetHelloService = TestBed.get(GetHelloService);
    expect(service).toBeTruthy();
  });
});
