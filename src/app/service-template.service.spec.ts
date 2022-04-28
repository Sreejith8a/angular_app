import { TestBed } from '@angular/core/testing';

import { ServiceTemplateService } from './service-template.service';

describe('ServiceTemplateService', () => {
  let service: ServiceTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
