import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToUpperCaseDirective } from './to-upper-case.directive';

@Component({
  standalone: true,
  template: `<input toUpperCase [formControl]="control">`,
  imports: [ReactiveFormsModule, ToUpperCaseDirective]
})
class TestComponent {
  control = new FormControl('');
}

describe('ToUpperCaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: HTMLInputElement;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('debería convertir a mayúsculas y actualizar control al escribir', () => {
    inputEl.value = 'testString';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.value).toBe('TESTSTRING');
    expect(component.control.value).toBe('TESTSTRING');
  });

  it('no debería actualizar el valor si ya está en mayúsculas', () => {
    inputEl.value = 'HELLO';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputEl.value).toBe('HELLO');
    expect(component.control.value).toBe('HELLO');
  });
});
