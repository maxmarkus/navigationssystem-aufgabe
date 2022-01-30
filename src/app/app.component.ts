import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Link } from './app.api';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  links: Link[];

  selectedLinkIndex: number;

  private subscription: Subscription;

  constructor(private navigationService: NavigationService, private router: Router) {
    this.links = [];
  }

  ngOnInit(): void {
    this.subscription = this.navigationService.getNavigationItems().subscribe((links) => {
      if (links.length && this.selectedLinkIndex === undefined) {
        this.selectedLinkIndex = 0;
      }

      this.links = links;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  select(selectedLinkIndex: number) {
    this.selectedLinkIndex = selectedLinkIndex;
  }

  goBack() {
    this.selectedLinkIndex -= 1;
    this.nagivateToLinkByIndex();
  }

  goForward() {
    this.selectedLinkIndex += 1;
    this.nagivateToLinkByIndex();
  }

  private nagivateToLinkByIndex() {
    this.router.navigate([this.links[this.selectedLinkIndex].route]);
  }
}
