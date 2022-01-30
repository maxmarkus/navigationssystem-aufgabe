import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Link } from './app.api';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private staticNavigationItems$: BehaviorSubject<Link[]> = new BehaviorSubject<Link[]>(null);

  private dynamicNavigationItems$: BehaviorSubject<Link[]> = new BehaviorSubject<Link[]>(null);

  constructor() {
    this.staticNavigationItems$.next([
      { title: 'M', route: 'm' },
      { title: 'A', route: 'a' },
      { title: undefined, route: 'x' },
      { title: 'B', route: 'b' },
      { title: 'H', route: null },
    ]);
    this.mockFetchNavigationItems();
  }

  public getNavigationItems(): Observable<Link[]> {
    return combineLatest([this.staticNavigationItems$, this.dynamicNavigationItems$]).pipe(
      map(([statik, dynamic]) => {
        // Assign default values in case the Observables are returning a falsy value
        statik = statik ?? [];
        dynamic = dynamic ?? [];

        const combinedLinks = statik.concat(dynamic);
        const validLinks = combinedLinks.filter((l) => l?.title && l?.route);
        return validLinks.sort((a, b) => a.title.localeCompare(b.title));
      })
    );
  }

  private mockFetchNavigationItems(): void {
    // as if it would come from an http request
    setTimeout(() => this.dynamicNavigationItems$.next([
      { title: 'C', route: 'c' },
      { title: 'Z', route: 'z' },
    ]), 500);
  }
}
