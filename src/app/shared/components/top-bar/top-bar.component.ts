import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  signal,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import {
  NATIVE_ELEMENTS_INTERACTIONS,
  POPUP_STATUS,
  Routes,
  TOGGLE_STATUS,
  WINDOWS_SCROLL,
} from '../../contants/constants';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [ButtonComponent, RouterLink, NgOptimizedImage],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent implements AfterViewInit {
  protected chatRoute = Routes['CHATS_PAGE'];
  protected landingPageRoute = Routes['LANDING_PAGE'];
  protected loginRoute = Routes['LOGIN'];
  protected overViewRoute = Routes['OVERVIEW_PAGE'];
  protected mentorsRoute = Routes['MENTORS_PAGE'];
  protected settingsRoute = Routes['SETTINGS_PAGE'];
  protected taskRoute = Routes['TASKS_PAGE'];

  private hamburgerRef = viewChild<ElementRef>('hamburger');
  private navElementRef = viewChild<ElementRef>('navElement');
  private navLinksRef = viewChild<ElementRef>('navLinks');
  private searchIconRef = viewChild<ElementRef>('searchIcon');
  private searchWrapperRef = viewChild<ElementRef>('searchWrapper');
  private searchAndButtonWrapperRef = viewChild<ElementRef>(
    'searchAndButtonWrapper',
  );
  private navRef = viewChild<ElementRef>('nav');

  ngAfterViewInit(): void {
    this.hamburgerRef()?.nativeElement.addEventListener('click', () => {
      this.toggleMenu();
    });

    this.searchIconRef()?.nativeElement.addEventListener('click', () => {
      this.toggleSearch();
    });
  }

  toggleMenu(): void {
    this.navLinksRef()?.nativeElement.classList.toggle(TOGGLE_STATUS.ACTIVE);
    this.hamburgerRef()?.nativeElement.classList.toggle(TOGGLE_STATUS.OPEN);
  }

  toggleSearch(): void {
    if (
      !this.searchWrapperRef ||
      !this.searchAndButtonWrapperRef ||
      !this.navLinksRef ||
      !this.hamburgerRef
    ) {
      return;
    }

    const isSearchActive =
      this.searchWrapperRef()?.nativeElement.classList.contains(
        NATIVE_ELEMENTS_INTERACTIONS.SEARCH_ELEMENT_ACTIVE,
      );

    if (!isSearchActive) {
      this.searchWrapperRef()?.nativeElement.classList.add(
        NATIVE_ELEMENTS_INTERACTIONS.SEARCH_ELEMENT_ACTIVE,
      );
      this.searchAndButtonWrapperRef()?.nativeElement.classList.add(
        NATIVE_ELEMENTS_INTERACTIONS.HIDE_ELEMENT,
      );
      this.navLinksRef()?.nativeElement.classList.add(
        NATIVE_ELEMENTS_INTERACTIONS.HIDE_ELEMENT,
      );
      this.hamburgerRef()?.nativeElement.classList.add(
        NATIVE_ELEMENTS_INTERACTIONS.HIDE_ELEMENT,
      );
    } else {
      this.searchWrapperRef()?.nativeElement.classList.remove(
        NATIVE_ELEMENTS_INTERACTIONS.SEARCH_ELEMENT_ACTIVE,
      );
      this.searchAndButtonWrapperRef()?.nativeElement.classList.remove(
        NATIVE_ELEMENTS_INTERACTIONS.HIDE_ELEMENT,
      );
      this.navLinksRef()?.nativeElement.classList.remove(
        NATIVE_ELEMENTS_INTERACTIONS.HIDE_ELEMENT,
      );
      this.hamburgerRef()?.nativeElement.classList.remove(
        NATIVE_ELEMENTS_INTERACTIONS.HIDE_ELEMENT,
      );
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const threshold = signal(200);
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > threshold()) {
      this.navElementRef()?.nativeElement.classList.add(
        WINDOWS_SCROLL.SCROLLED,
      );
    } else {
      this.navElementRef()?.nativeElement.classList.remove(
        WINDOWS_SCROLL.SCROLLED,
      );
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const isClickInsideSearchIcon =
      this.searchIconRef()?.nativeElement.contains(event.target);
    const isClickInsideSearchWrapper =
      this.searchWrapperRef()?.nativeElement.contains(event.target);
    const isClickInsideSearchInput =
      (event.target as HTMLElement).tagName === 'INPUT' &&
      this.searchWrapperRef()?.nativeElement.contains(event.target);

    if (
      !isClickInsideSearchIcon &&
      !isClickInsideSearchWrapper &&
      !isClickInsideSearchInput
    ) {
      this.searchWrapperRef()?.nativeElement.classList.remove(
        NATIVE_ELEMENTS_INTERACTIONS.SEARCH_ELEMENT_ACTIVE,
      );
      this.searchAndButtonWrapperRef()?.nativeElement.classList.remove(
        NATIVE_ELEMENTS_INTERACTIONS.HIDE_ELEMENT,
      );
      this.navLinksRef()?.nativeElement.classList.remove(
        NATIVE_ELEMENTS_INTERACTIONS.HIDE_ELEMENT,
      );
      this.hamburgerRef()?.nativeElement.classList.remove(
        NATIVE_ELEMENTS_INTERACTIONS.HIDE_ELEMENT,
      );
    }
  }

  protected togglePopup(popupId: string, show: boolean): void {
    const popup = this.navLinksRef()?.nativeElement.querySelector(
      `#${popupId}`,
    );
    if (popup) {
      if (show) {
        popup.classList.add(POPUP_STATUS.ACTIVE);
      } else {
        popup.classList.remove(POPUP_STATUS.ACTIVE);
      }
    }
  }
}
