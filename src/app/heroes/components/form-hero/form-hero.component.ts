import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Hero } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-form-hero',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  standalone: true,
  templateUrl: './form-hero.component.html',
  styleUrl: './form-hero.component.scss'
})
export class FormHeroComponent {

  heroForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Inicializo el form con valores vacíos o por defecto
    this.heroForm = this.fb.group({
      id: [0, [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      image: ['', [Validators.required, this.imageValidator()]]
    });
  }

  imageValidator(): ValidatorFn {
    return (control) => {
      const value = control.value;
      if (!value) return null;

      if (value.startsWith('data:image/jpeg') || value.startsWith('data:image/png')) {
        return null;
      }

      if (typeof value === 'string') {
        const ext = value.split('.').pop()?.toLowerCase();
        if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
          return null;
        }
      }

      return { invalidImageFormat: true };
    };
  }

  // Handler al seleccionar archivo
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      this.heroForm.controls['image'].setErrors({ invalidImageFormat: true });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // reader.result es base64 string
      this.heroForm.controls['image'].setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.heroForm.valid) {
      const hero: Hero = this.heroForm.value;
      console.log('Formulario válido, héroe:', hero);
      // acá harías la lógica para guardar o enviar el héroe
    } else {
      this.heroForm.markAllAsTouched();
    }
  }

}
