import { TestBed } from '@angular/core/testing';

import { MyPhoneBookService } from './my-phone-book.service';

describe('MyPhoneBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyPhoneBookService = TestBed.get(MyPhoneBookService);
    expect(service).toBeTruthy();
  });
});
