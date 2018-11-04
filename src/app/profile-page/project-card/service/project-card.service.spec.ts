import { TestBed } from '@angular/core/testing';

import { ProjectCardService } from './project-card.service';

describe('ProjectCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectCardService = TestBed.get(ProjectCardService);
    expect(service).toBeTruthy();
  });
});
