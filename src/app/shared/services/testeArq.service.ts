import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceBase } from './service.base';
import { TesteArqMockService } from '../mock/testeArq.mock.service';
import { AlunoJson } from '../json/aluno.json';
import { CursoJson } from '../json/curso.json';
import { HorasComplementaresJson } from '../json/horas-complementares.json';

@Injectable()
export class TesteArqService extends ServiceBase {
  constructor(protected http: HttpClient) {
    super(http);
  }

  //ALUNOS:
  getAlunos(): Observable<Array<AlunoJson>> {
    if(environment.mock) return of(TesteArqMockService.prototype.getAlunos());
    this.path = 'Aluno';
    return this.get();
  }
  
  getAlunoById(alunoId: number): Observable<AlunoJson> {
    if(environment.mock) return of(TesteArqMockService.prototype.getAlunoById());
    this.path = 'Aluno/' + alunoId;
    return this.get();
  }

  //CURSOS:
  getCursos(): Observable<Array<CursoJson>> {
    if(environment.mock) return of(TesteArqMockService.prototype.getCursos());
    this.path = 'Curso';
    return this.get();
  }

  //HORAS COMPLEMENTARES:
  getHorasComplementares(): Observable<Array<HorasComplementaresJson>> {
    if(environment.mock) return of(TesteArqMockService.prototype.getHorasComplementares());
    this.path = 'HorasComplementares';
    return this.get();
  }

  getHorasComplementaresByCurso(cursoId: number): Observable<Array<HorasComplementaresJson>> {
    if(environment.mock) return of(TesteArqMockService.prototype.getHorasComplementaresByCurso());
    this.path = 'HorasComplementares/Curso/' + cursoId;
    return this.get();
  }
}