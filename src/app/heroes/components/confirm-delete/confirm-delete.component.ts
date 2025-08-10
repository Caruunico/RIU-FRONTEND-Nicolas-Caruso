import { CommonModule } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
import { Hero } from '../../interfaces/heroe.interface';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-delete',
  imports: [CommonModule, MatButtonModule ,NgbModalModule],
  standalone: true,
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss'
})
export class ConfirmDeleteComponent {
  public modal = inject(NgbActiveModal);

  @Input() hero: Hero | null = null;

  public deleteHero(){
    this.modal.close(true);
  }

}
