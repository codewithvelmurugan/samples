import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[alphabetOnly]'
})
export class AlphabetOnlyDirective {

  constructor() { }

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const sanitized = input.value.replace(/[^a-zA-Z\s]*/g, '');
    input.value = sanitized;
  }

}
