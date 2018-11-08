import { TestBed } from '@angular/core/testing';

import { ProjectTableService } from './project-table.service';

describe('ProjectTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectTableService = TestBed.get(ProjectTableService);
    expect(service).toBeTruthy();
  });
});
