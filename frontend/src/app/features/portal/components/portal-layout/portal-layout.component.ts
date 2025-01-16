import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule, Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";
import { UserModel } from "../../models/user-model";

@Component({
  selector: 'app-portal-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portal-layout.component.html',
  styleUrl: './portal-layout.component.scss'
})
export class PortalLayoutComponent implements OnInit {
  isNavCollapsed = false;
  currentPageTitle = '';
  user: UserModel | null = null;
  expandedMenu: string | null = null;

  constructor(private router: Router) {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Check if URL ends with "dashboard"
        if (event.urlAfterRedirects.endsWith('dashboard')) {
          // Collapse the nav
          this.isNavCollapsed = true;
          // Optionally close expanded sub-menus
          this.expandedMenu = null;
        } else {

        }
      });
  }

  toggleNav() {
    if (!this.isNavCollapsed) {
      this.expandedMenu = null;
    }
    this.isNavCollapsed = !this.isNavCollapsed;
  }

  toggleMenu(menu: string) {
    this.expandedMenu = this.expandedMenu === menu ? null : menu;
  }
}
