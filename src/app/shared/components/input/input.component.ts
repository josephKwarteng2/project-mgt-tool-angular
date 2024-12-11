import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputVariants } from './types';

type CallbackFunction = (value?: string | number) => void;

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() icon?: string;
  @Input() placeholder?: string;
  @Input() placeholderTextWeight: string = 'normal';
  @Input() value?: string | number = '';
  @Input() type: string = 'text';
  @Input() isDisabled = false;
  @Input() error?: string = '';
  @Input() inputValid: boolean = true;
  @Input() variant: InputVariants = 'outlined';
  @Input() label?: string;
  @Input() id? = Math.random().toString();
  @Input() name?: string;
  @Input() ariaLabel?: string;
  @Input() prefixText?: string;
  @Input() isRequired: boolean = false;
  @Input() showVisibilityToggles = false;
  @Input() borderColor?: string;
  @Input() borderThickness?: string;
  @Input() focusBorderColor: string = '#0B76B7';
  @Input() iconPosition: 'start' | 'end' = 'start';
  @Input() isDropdown = false;
  @Input() dropdownOptions: string[] | { patientId: number; name: string }[] =
    [];
  @Input() isDatePicker = false;
  @Input() labelColor?: string;
  @Input() labelFontWeight: string = 'normal';
  @ViewChild('dateInput', { static: true })
  dateInput!: ElementRef<HTMLInputElement>;
  @Output() optionSelected = new EventEmitter<string>();
  isFieldVisible = signal(false);
  isDropdownOpen = signal(false);
  showDatePicker = signal(false);
  isFocused = signal(false);

  formControl!: FormControl;
  formBuilder = inject(FormBuilder);

  get control(): FormControl {
    return this.formControl || new FormControl();
  }

  get processedDropdownOptions(): string[] {
    if (typeof this.dropdownOptions[0] === 'string') {
      return this.dropdownOptions as string[];
    } else {
      return (
        this.dropdownOptions as { patientId: number; name: string }[]
      ).map((option) => option.name);
    }
  }

  ngOnInit(): void {
    this.setupForm();
  }

  ngOnChanges(): void {
    this.isDisabled ? this.formControl?.disable() : this.formControl?.enable();
  }

  setupForm() {
    this.formControl = this.formBuilder.control({
      value: this.value ?? '',
      disabled: this.isDisabled,
    });
    this.formControl.valueChanges.subscribe((value) =>
      this.onInputChange(value),
    );
  }

  onTogglePasswordVisibility() {
    this.isFieldVisible.set(!this.isFieldVisible());
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  onInputChange(value: string) {
    this.value = value;
    this.onChange(value);
    if (this.isFocused()) {
      this.onTouch();
    }
  }

  onInput(event: Event) {
    event.stopPropagation();
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onInputChange(inputElement.value);
  }

  onInputTouched(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.onTouch();
  }

  onFocus() {
    this.isFocused.set(true);
  }

  onBlur(event: Event) {
    this.isFocused.set(false);
    this.onInputTouched(event);
  }

  onChange = (_value?: string) => {
    _value;
  };

  onTouch = (_value?: string) => {
    _value;
  };

  registerOnChange(fn: CallbackFunction): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: CallbackFunction): void {
    this.onTouch = fn;
  }

  writeValue(value: string | number): void {
    this.value = value;
    if (this.formControl) {
      this.formControl.setValue(value, { emitEvent: false });
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    if (this.isDropdown) {
      this.isDropdownOpen.set(!this.isDropdownOpen());
    }
  }

  selectOption(option: string, event: Event) {
    event.stopPropagation();

    this.optionSelected.emit(option);

    const selectedOption = (
      this.dropdownOptions as { patientId: number; name: string }[]
    ).find((opt) => opt.name === option);

    if (selectedOption) {
      this.formControl.setValue(selectedOption.name);
    } else {
      this.formControl.setValue(option);
    }

    this.isDropdownOpen.set(false);
    this.onTouch();
  }

  onDateChange(event: Event) {
    event.stopPropagation();
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onInputChange(inputElement.value);
  }

  showDatePickerToggle(event: Event) {
    event.stopPropagation();
    if (this.isDatePicker) {
      this.showDatePicker.set(!this.showDatePicker());
      if (this.showDatePicker()) {
        setTimeout(() => this.dateInput.nativeElement.focus(), 0); // Focus after the view has updated
      }
    }
  }

  onIconClick(event: Event) {
    event.stopPropagation();
    if (this.isDatePicker) {
      this.dateInput.nativeElement.focus();
    } else if (this.isDropdown) {
      this.toggleDropdown(event);
    }
  }
}
