import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-projects',
  standalone: true,
  imports: [],
  templateUrl: './manage-projects.component.html',
  styleUrl: './manage-projects.component.scss',
})
export class ManageProjectsComponent implements OnInit, OnDestroy {
  private scrollListener!: () => void;

  ngOnInit(): void {
    this.scrollListener = this.onScroll.bind(this);
    window.addEventListener('scroll', this.scrollListener);
    this.onScroll();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
  }

  private onScroll(): void {
    const bulletins = document.querySelectorAll('.bulletin');

    bulletins.forEach((bulletin) => {
      const rect = (bulletin as HTMLElement).getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom >= 0) {
        (bulletin as HTMLElement).classList.add('in-view');
      } else {
        (bulletin as HTMLElement).classList.remove('in-view');
      }
    });
  }
}
