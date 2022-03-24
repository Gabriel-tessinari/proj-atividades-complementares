import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadosAlunoComponent } from './certificados-aluno.component';

describe('CertificadosAlunoComponent', () => {
  let component: CertificadosAlunoComponent;
  let fixture: ComponentFixture<CertificadosAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificadosAlunoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadosAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
