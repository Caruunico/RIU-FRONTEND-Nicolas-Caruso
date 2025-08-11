import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteComponent } from './confirm-delete.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Hero } from '../../interfaces/heroe.interface';

describe('ConfirmDeleteComponent', () => {
  let component: ConfirmDeleteComponent;
  let fixture: ComponentFixture<ConfirmDeleteComponent>;
  let activeModalMock: Partial<NgbActiveModal>;

  beforeEach(async () => {
    activeModalMock = {
      close: jest.fn(),
      dismiss: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteComponent],
      providers: [{ provide: NgbActiveModal, useValue: activeModalMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería aceptar el input hero', () => {
    const hero: Hero = { id: 1, name: 'Test Hero', description: 'desc', image: '' };
    component.hero = hero;
    expect(component.hero).toEqual(hero);
  });

  it('debería cerrar el modal con true al llamar a deleteHero()', () => {
    component.deleteHero();
    expect(activeModalMock.close).toHaveBeenCalledWith(true);
  });
});
