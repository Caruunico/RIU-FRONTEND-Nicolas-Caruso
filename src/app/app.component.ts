import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from './shared/services/loading/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private _loadingService = inject(LoadingService);

  title = 'RIU-Frontend-Nicolas-Caruso';
  loading$: Observable<boolean>;

  constructor() {
    this.loading$ = this._loadingService.loading$;
  }
}
