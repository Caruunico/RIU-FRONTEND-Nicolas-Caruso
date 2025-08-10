import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() totalRegistros?: number = 0;
  @Input() icon?: string = '';
  @Input() searchable?: boolean = false;

  @Output() searchEvent = new EventEmitter<string>();

  public search: FormControl = new FormControl('');

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)),
        takeUntil(this.destroy$)
      )
      .subscribe((filterTerm: string) => {
        this.searchEvent.emit(filterTerm);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
