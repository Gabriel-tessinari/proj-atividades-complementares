import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CursoJson } from '../json/curso.json';
import { ServiceBase } from './service-base';

@Injectable()
export class CursosService extends ServiceBase {
  constructor(protected http: HttpClient) {
    super(http);
    this.urlBase += '/cursos';
  }

  getCursos(): Observable<Array<CursoJson>> {
    this.path = '';
    return this.get();
  }

  getCursosFake(): Array<CursoJson> {
    let cursos: Array<CursoJson> = [];
    cursos.push({id: 1, nome: 'Ciência da Computação'});
    cursos.push({id: 2, nome: 'Engenharia da Computação'});
    return cursos;
  }
}