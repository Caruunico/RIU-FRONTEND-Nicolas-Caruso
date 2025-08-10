import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Hero } from '../../interfaces/heroe.interface';
import { GENERIC_IMG } from '../../mocks/generic-img.mock';
import { ACCEPTED_FILES } from '../../interfaces/accepted-files.type';
import { ACCEPTED_FILES_LIST } from '../../mocks/accepted-file-list.mock';
import { ToUpperCaseDirective } from '../../../shared/directives/to-upper-case.directive';

@Component({
  selector: 'app-form-hero',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, ToUpperCaseDirective],
  standalone: true,
  templateUrl: './form-hero.component.html',
  styleUrl: './form-hero.component.scss'
})
export class FormHeroComponent {
  @Input() heroeSelected?: Hero | null = null;
  @Output() onHero: EventEmitter<Hero> = new EventEmitter<Hero>();

  public heroForm!: FormGroup;
  public genericImg: string = GENERIC_IMG;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required, this._imageValidator()]]
    });

    if (this.heroeSelected) {
      this.heroForm.patchValue(this.heroeSelected)
    }
  }

  private _imageValidator(): ValidatorFn {
    return (control) => {
      const value = control.value;
      if (!value) return null;

      if (value.startsWith('data:image/jpeg') || value.startsWith('data:image/png')) {
        return null;
      }

      if (typeof value === 'string') {
        const ext = value.split('.').pop()?.toLowerCase();
        if (ext === ACCEPTED_FILES.JPG || ext === ACCEPTED_FILES.JPEG || ext === ACCEPTED_FILES.PNG) {
          return null;
        }
      }

      return { invalidImageFormat: true };
    };
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const allowedTypes = ACCEPTED_FILES_LIST;
    if (!allowedTypes.includes(file.type)) {
      this.heroForm.controls['image'].setErrors({ invalidImageFormat: true });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.heroForm.controls['image'].setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  public sendToFather() {
    if (this.heroForm.valid) {
      let hero: Hero = this.heroForm.value;
      if(this.heroeSelected){
        hero = {
          ...hero,
          id: this.heroeSelected.id
        }
      }
      this.onHero.emit(hero);
    } else {
      this.heroForm.markAllAsTouched();
    }
  }

}
