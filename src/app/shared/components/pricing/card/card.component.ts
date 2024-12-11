import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { BadgeTitle } from './types';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title: string = '';
  @Input() description: string =
    'With lots of unique blocks, you can easily build a page without coding. Build your next landing page.';
  @Input() price: string = '';
  @Input() paymentType: string = 'One time payment';
  @Input() badge: BadgeTitle = 'BASIC';
  @Input() buttonText: string = 'Learn More';
  @Input() buttonLink: string = '#';
}
