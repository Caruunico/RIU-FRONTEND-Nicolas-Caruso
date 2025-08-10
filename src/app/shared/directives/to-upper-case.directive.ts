import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[toUpperCase]'
})
export class ToUpperCaseDirective {
  private _control = inject(NgControl);

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const upper = input.value.toUpperCase();

    if (upper !== input.value) {
      input.value = upper;
      this._control.control?.setValue(upper, { emitEvent: false });
    }
  }

}
