import { Component } from '@angular/core';
import { UserModel } from '../../models/user-model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portal-layout',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './portal-layout.component.html',
  styleUrl: './portal-layout.component.scss'
})
export class PortalLayoutComponent {
  isNavCollapsed = false;
  currentPageTitle = '';
  user: UserModel | null = null;
  expandedMenu: string | null = null;


  constructor() {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  toggleNav() {
    // if we should collapse the nav i want to close the menus also if we should open it leave them closed
    if (!this.isNavCollapsed) {
      this.expandedMenu = null;
    }
    this.isNavCollapsed = !this.isNavCollapsed;
  }

  toggleMenu(menu: string) {
    this.expandedMenu = this.expandedMenu === menu ? null : menu;
  }

}
