import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceBase } from './service.base';
import { TesteArqMockService } from '../mock/testeArq.mock.service';
import { AlunoJson } from '../json/aluno.json';
import { CursoJson } from '../json/curso.json';
import { HorasComplementaresJson } from '../json/horas-complementares.json';
import { HorasComplementaresAtualizaStatusJson } from '../json/horas-complementares-atualiza-status.json';
import { AtividadeJson } from '../json/atividade.json';
import { GrupoAtividadesJson } from '../json/grupo-atividades.json';
import { AreaJson } from '../json/area.json';
import { PontuacaoJson } from '../json/pontuacao.json';


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

  //ÁREAS:
  getAreas(): Observable<Array<AreaJson>> {
    if(environment.mock) return of(TesteArqMockService.prototype.getAreas());
    this.path = 'Area';
    return this.get();
  }

  //ATIVIDADES:
  getAtividades(): Observable<Array<AtividadeJson>> {
    if(environment.mock) return of(TesteArqMockService.prototype.getAtividades());
    this.path = 'Atividades';
    return this.get();
  }

  createAtividade(newAtividade: AtividadeJson): Observable<AtividadeJson> {
    if(environment.mock) return of(TesteArqMockService.prototype.createAtividade());
    this.path = 'Atividades';
    return this.post(newAtividade);
  }

  updateAtividade(atividade: AtividadeJson): Observable<AtividadeJson> {
    if(environment.mock) return of(TesteArqMockService.prototype.updateAtividade());
    this.path = 'Atividades';
    return this.put(atividade);
  }

  deleteAtividade(id: number): Observable<void> {
    if(environment.mock) return of(TesteArqMockService.prototype.deleteAtividade());
    this.path = 'Atividades';
    return this.delete(id);
  }

  //CURSOS:
  getCursos(): Observable<Array<CursoJson>> {
    if(environment.mock) return of(TesteArqMockService.prototype.getCursos());
    this.path = 'Curso';
    return this.get();
  }

  getCursosByArea(areaId: number): Observable<Array<CursoJson>> {
    if(environment.mock) return of(TesteArqMockService.prototype.getCursosByArea());
    this.path = 'Curso/Area/' + areaId;
    return this.get();
  }

  //GRUPOS DE ATIVIDADES:
  getGruposAtividades(): Observable<Array<GrupoAtividadesJson>> {
    if(environment.mock) return of(TesteArqMockService.prototype.getGruposAtividades());
    this.path = 'GrupoAtividades';
    return this.get();
  }

  createGrupoAtividades(newGrupo: GrupoAtividadesJson): Observable<GrupoAtividadesJson> {
    if(environment.mock) return of(TesteArqMockService.prototype.createGrupoAtividades());
    this.path = 'GrupoAtividades';
    return this.post(newGrupo);
  }

  deleteGrupoAtividades(id: number): Observable<void> {
    if(environment.mock) return of(TesteArqMockService.prototype.deleteGrupoAtividades());
    this.path = 'GrupoAtividades';
    return this.delete(id);
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

  updateHoraComplementarStatus(updateStatus: HorasComplementaresAtualizaStatusJson): Observable<HorasComplementaresJson> {
    if(environment.mock) return of(TesteArqMockService.prototype.updateHoraComplementarStatus());
    this.path = 'HorasComplementares/AtualizaStatus';
    return this.post(updateStatus);
  }

  //PONTUAÇÕES:
  getPontuacoes(): Observable<Array<PontuacaoJson>> {
    if(environment.mock) return of(TesteArqMockService.prototype.getPontuacoes());
    this.path = 'Pontuacao';
    return this.get();
  }

  saveOrUpdatePontuacao(pontuacao: PontuacaoJson): Observable<void> {
    if(environment.mock) return of(TesteArqMockService.prototype.saveOrUpdatePontuacao());
    this.path = 'Pontuacao';
    return this.put(pontuacao);
  }
}