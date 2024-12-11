import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ButtonSize, ButtonVariants } from './types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: ButtonVariants = 'filled';
  @Input() size: ButtonSize = 'small';
  @Input() icon?: string;
  @Input() text!: string;
  @Input() ariaLabel?: string;
  @Input() disabled = false;
  @Input() isLoading = false;

  @Output() clickEvent = new EventEmitter<null>();

  @ViewChild('btn') btnRef?: ElementRef;

  /* listens for 'enter' key events when the button has focus
   * does not propagate events if the btn is disabled */
  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    if (this.btnRef?.nativeElement === document.activeElement && this.disabled)
      event?.preventDefault();
  }
}
