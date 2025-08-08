import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeslistComponent } from './heroeslist.component';

describe('HeroeslistComponent', () => {
  let component: HeroeslistComponent;
  let fixture: ComponentFixture<HeroeslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroeslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
