import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroListaComponent } from './livro-lista.component';

describe('LivroListaComponent', () => {
  let component: LivroListaComponent;
  let fixture: ComponentFixture<LivroListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivroListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
