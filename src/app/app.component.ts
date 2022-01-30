import { Component, OnDestroy, OnInit } from '@angular/core';
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

  private subscription: Subscription;

  constructor(private navigationService: NavigationService) {
    this.links = [];
  }

  ngOnInit(): void {
    this.subscription = this.navigationService.getNavigationItems().subscribe((links) => {
      this.links = links;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
