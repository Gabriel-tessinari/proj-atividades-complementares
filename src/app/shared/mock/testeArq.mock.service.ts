import { Injectable } from "@angular/core";
import { MockUtil } from "./mock.util";
import { AlunoJson } from "../json/aluno.json";
import { CursoJson } from "../json/curso.json";
import { HorasComplementaresJson } from "../json/horas-complementares.json";
import { AtividadeJson } from "../json/atividade.json";
import { GrupoAtividadesJson } from "../json/grupo-atividades.json";
import { AreaJson } from "../json/area.json";
import { PontuacaoJson } from "../json/pontuacao.json";

@Injectable()
export class TesteArqMockService {
  //ALUNOS:
  getAlunos(): Array<AlunoJson> {
    let response = [];
    for(let i = 0; i < MockUtil.injectNumber(10); i++) {
      response.push(AlunoJson.prototype.mockObject());
    }
    return response;
  }

  getAlunoById(): AlunoJson {
    return AlunoJson.prototype.mockObject();
  }

  //ÁREAS:
  getAreas(): Array<AreaJson> {
    let response = [];
    for(let i = 0; i < MockUtil.injectNumber(10); i++) {
      response.push(AreaJson.prototype.mockObject());
    }
    return response;
  }

  //ATIVIDADES:
  getAtividades(): Array<AtividadeJson> {
    let response = [];
    for(let i = 0; i < MockUtil.injectNumber(10); i++) {
      response.push(AtividadeJson.prototype.mockObject());
    }
    return response;
  }

  createAtividade(): AtividadeJson {
    return AtividadeJson.prototype.mockObject();
  }

  updateAtividade(): AtividadeJson {
    return AtividadeJson.prototype.mockObject();
  }

  deleteAtividade(): void {
    console.log("TENTOU DELETAR UMA ATIVIDADE");
  }
  
  //CURSOS:
  getCursos(): Array<CursoJson> {
    let response = [];
    for(let i = 0; i < MockUtil.injectNumber(10); i++) {
      response.push(CursoJson.prototype.mockObject());
    }
    return response;
  }

  getCursosByArea(): Array<CursoJson> {
    let response = [];
    for(let i = 0; i < MockUtil.injectNumber(10); i++) {
      response.push(CursoJson.prototype.mockObject());
    }
    return response;
  }

  //GRUPOS DE ATIVIDADES:
  getGruposAtividades(): Array<GrupoAtividadesJson> {
    let response = [];
    for(let i = 0; i < MockUtil.injectNumber(10); i++) {
      response.push(GrupoAtividadesJson.prototype.mockObject());
    }
    return response;
  }

  createGrupoAtividades(): GrupoAtividadesJson {
    return GrupoAtividadesJson.prototype.mockObject();
  }

  deleteGrupoAtividades(): void {
    console.log("TENTOU DELETAR UM GRUPO DE ATIVIDADES");
  }

  //HORAS COMPLEMENTARES:
  getHorasComplementares(): Array<HorasComplementaresJson> {
    let response = [];
    for(let i = 0; i < MockUtil.injectNumber(10); i++) {
      response.push(HorasComplementaresJson.prototype.mockObject());
    }
    return response;
  }

  getHorasComplementaresByCurso(): Array<HorasComplementaresJson> {
    let response = [];
    for(let i = 0; i < MockUtil.injectNumber(10); i++) {
      response.push(HorasComplementaresJson.prototype.mockObject());
    }
    return response;
  }

  updateHoraComplementarStatus(): HorasComplementaresJson { 
    return HorasComplementaresJson.prototype.
    mockObject();
  }

  //PONTUAÇÕES:
  getPontuacoes(): Array<PontuacaoJson> {
    let response = [];
    for(let i = 0; i < MockUtil.injectNumber(10); i++) {
      response.push(PontuacaoJson.prototype.mockObject());
    }
    return response;
  }

  saveOrUpdatePontuacao(): void {
    console.log("TENTOU SALVAR UMA PONTUAÇÃO");
  }
}