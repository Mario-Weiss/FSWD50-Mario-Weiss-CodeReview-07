import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

	currentUrl: string;

  constructor(private router: Router) {
    router.events.subscribe((_:NavigationEnd) => this.currentUrl = this.router.url);
    ;
  }
  ngOnInit() {
  }

}
