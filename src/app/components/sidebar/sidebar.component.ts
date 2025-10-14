import { Component, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

   readonly _AuthService = inject(AuthService) ;




    private readonly Plat_Id = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.Plat_Id);

  sidebarOpen = false;
  isMobile = false;

  constructor() {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth < 768;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) this.sidebarOpen = false; // الديسكتوب يفضل مفتوح دائمًا
    }
  }

  toggleSidebar() {
    if (this.isBrowser) {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }

  closeSidebarOnLinkClick() {
    if (this.isBrowser && this.isMobile) {
      this.sidebarOpen = false;
    }
  }







}
