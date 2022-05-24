import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroListaItemComponent } from './livro-lista-item.component';

describe('LivroListaItemComponent', () => {
  let component: LivroListaItemComponent;
  let fixture: ComponentFixture<LivroListaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivroListaItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroListaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
