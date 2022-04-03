import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlunoJson } from '../json/aluno.json';
import { CursoJson } from '../json/curso.json';
import { HorasComplementaresJson } from '../json/horas-complementares.json';
import { ServiceBase } from './service.base';

@Injectable()
export class TesteArqService extends ServiceBase {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getAlunos(): Observable<Array<AlunoJson>> {
    this.path = 'Aluno';
    return this.get();
  } 

  getCursos(): Observable<Array<CursoJson>> {
    this.path = 'Curso';
    return this.get();
  }

  getHorasComplementares(): Observable<Array<HorasComplementaresJson>> {
    this.path = 'HorasComplementares';
    return this.get();
  }

  getHorasComplementaresByCurso(cursoId: number): Observable<Array<HorasComplementaresJson>> {
    this.path = 'HorasComplementares/Curso/' + cursoId;
    return this.get();
  }
}