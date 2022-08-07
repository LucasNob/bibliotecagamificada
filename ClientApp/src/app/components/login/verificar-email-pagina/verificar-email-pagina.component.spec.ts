import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificarEmailPaginaComponent } from './verificar-email-pagina.component';


describe('LoginPaginaComponent', () => {
  let component: VerificarEmailPaginaComponent;
  let fixture: ComponentFixture<VerificarEmailPaginaComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificarEmailPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarEmailPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
