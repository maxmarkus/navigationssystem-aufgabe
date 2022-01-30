import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { debounceTime, first, skip } from 'rxjs/operators';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(NavigationService);

    // Increased default timeout due to duration of the mocked http request
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1500;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get navigation items - empty list without routes', (done) => {
    let supportCounter = 0;
    service.getNavigationItems().subscribe((links) => {
      expect(links).toEqual([]);
      if (supportCounter === 1) {
        done();
      }
      supportCounter++;
    });
  });

  it('get navigation items - ', inject([Router], (router: Router) => {
    router.config = [{ path: 'a', component: null }];

    service
      .getNavigationItems()
      .pipe(first())
      .subscribe((links) => {
        expect(links).toEqual([{ title: 'A', route: 'a' }]);
      });
  }));
});
