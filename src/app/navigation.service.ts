import { CdkVirtualForOf } from '@angular/cdk/scrolling';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Link } from './app.api';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private staticNavigationItems$: BehaviorSubject<Link[]> = new BehaviorSubject<Link[]>(null);

  private dynamicNavigationItems$: BehaviorSubject<Link[]> = new BehaviorSubject<Link[]>(null);

  constructor(private router: Router) {
    this.staticNavigationItems$.next([
      { title: 'M', route: 'm' },
      { title: 'A', route: 'a' },
      { title: undefined, route: 'x' },
      { title: 'B', route: 'b' },
      { title: 'H', route: null },
    ]);
    this.mockFetchNavigationItems();
  }

  /**
   * Combines the static and dynamic links of this application and validates them
   *
   * A link is only valid, if it has a title, a route and is defined in the Angular Router configuration
   *
   * @returns an Observable which returns a list of valid links
   */
  public getNavigationItems(): Observable<Link[]> {
    return combineLatest([this.staticNavigationItems$, this.dynamicNavigationItems$]).pipe(
      map(([statik, dynamic]) => {
        // Assign default values in case the Observables are returning a falsy value
        statik = statik ?? [];
        dynamic = dynamic ?? [];

        const combinedLinks = statik.concat(dynamic);
        const validLinks = combinedLinks.filter(
          (link) => link?.title && link?.route && this.router.config.some((c) => c.path === link.route)
        );
        return validLinks.sort((a, b) => a.title.localeCompare(b.title));
      })
    );
  }

  private mockFetchNavigationItems(): void {
    // as if it would come from an http request
    setTimeout(
      () =>
        this.dynamicNavigationItems$.next([
          { title: 'C', route: 'c' },
          { title: 'Z', route: 'z' },
        ]),
      500
    );
  }
}
