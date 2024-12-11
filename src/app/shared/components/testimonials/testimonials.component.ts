import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements AfterViewInit {
  ngAfterViewInit() {
    const scrollers = document.querySelectorAll('.scroller');

    // If a user hasn't opted in for reduced motion, then we add the animation
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.addAnimation(scrollers);
    }
  }

  addAnimation(scrollers: NodeListOf<Element>) {
    scrollers.forEach((scroller) => {
      // add data-animated="true" to every `.scroller` on the page
      scroller.setAttribute('data-animated', 'true');

      // Make an array from the elements within `.scroller-inner`
      const scrollerInner = scroller.querySelector(
        '.scroller__inner',
      ) as HTMLElement;
      const scrollerContent = Array.from(scrollerInner.children);

      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement;
        duplicatedItem.setAttribute('aria-hidden', 'true');
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
}
