import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormHeroComponent } from './form-hero.component';
import { Hero } from '../../interfaces/heroe.interface';

describe('FormHeroComponent', () => {
  let component: FormHeroComponent;
  let fixture: ComponentFixture<FormHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormHeroComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el formulario vacío inicialmente', () => {
    fixture.detectChanges();
    expect(component.heroForm).toBeDefined();
    expect(component.heroForm.valid).toBe(false);
  });

  it('debería parchear formulario con heroeSelected', () => {
    const heroMock: Hero = {
      id: 1,
      name: 'HeroTest',
      description: 'Desc',
      image: 'image.png',
    };
    component.heroeSelected = heroMock;
    fixture.detectChanges();
    expect(component.heroForm.value.name).toBe(heroMock.name);
    expect(component.heroForm.value.description).toBe(heroMock.description);
    expect(component.heroForm.value.image).toBe(heroMock.image);
  });

  it('sendToFather emite hero si formulario válido', () => {
    fixture.detectChanges();

    const hero: Hero = {
      id: 1,
      name: 'Test',
      description: 'Desc',
      image: 'file.png',
    };

    component.heroForm.setValue({
      name: hero.name,
      description: hero.description,
      image: hero.image,
    });

    const spyEmit = jest.spyOn(component.onHero, 'emit');

    component.sendToFather();

    expect(spyEmit).toHaveBeenCalledWith({
      name: hero.name,
      description: hero.description,
      image: hero.image,
    });
  });

  it('sendToFather agrega id si heroeSelected existe', () => {
    fixture.detectChanges();

    const hero: Hero = {
      id: 10,
      name: 'Test',
      description: 'Desc',
      image: 'file.png',
    };

    component.heroeSelected = { ...hero };
    component.heroForm.setValue({
      name: hero.name,
      description: hero.description,
      image: hero.image,
    });

    const spyEmit = jest.spyOn(component.onHero, 'emit');

    component.sendToFather();

    expect(spyEmit).toHaveBeenCalledWith({
      ...component.heroForm.value,
      id: 10,
    });
  });

  it('sendToFather marca controles si formulario inválido', () => {
    fixture.detectChanges();

    component.heroForm.setValue({
      name: '',
      description: '',
      image: '',
    });

    const markAllAsTouchedSpy = jest.spyOn(component.heroForm, 'markAllAsTouched');

    component.sendToFather();

    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });
});
