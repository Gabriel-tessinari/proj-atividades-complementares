import { Injectable } from "@angular/core";
import { MockUtil } from "./mock.util";
import { AlunoJson } from "../json/aluno.json";
import { CursoJson } from "../json/curso.json";
import { HorasComplementaresJson } from "../json/horas-complementares.json";

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
  
  //CURSOS:
  getCursos(): Array<CursoJson> {
    let response = [];
    for(let i = 0; i < MockUtil.injectNumber(10); i++) {
      response.push(CursoJson.prototype.mockObject());
    }
    return response;
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
    return HorasComplementaresJson.prototype.mockObject();
  }
}