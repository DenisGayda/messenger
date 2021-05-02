import { TestBed, inject } from '@angular/core/testing';
import { EditingControlService } from './editing-control.service';

describe('EditingControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditingControlService]
    });
  });

  it('should be created', inject([EditingControlService], (service: EditingControlService) => {
    expect(service).toBeTruthy();
  }));
});
