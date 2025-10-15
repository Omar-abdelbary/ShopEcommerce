import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
  selector: 'app-scrolltop',
  standalone: true,
  imports: [CommonModule, ScrollTopModule],
  templateUrl: './scrolltop.component.html',
  styleUrl: './scrolltop.component.css'
})
export class ScrolltopComponent {



  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 400; // يظهر بعد 400 بكسل
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
