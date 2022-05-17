import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacaoListaItemComponent } from './classificacao-lista-item.component';

describe('ClassificacaoListaItemComponent', () => {
  let component: ClassificacaoListaItemComponent;
  let fixture: ComponentFixture<ClassificacaoListaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificacaoListaItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacaoListaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
