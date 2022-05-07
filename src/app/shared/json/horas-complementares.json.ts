import { MockUtil } from "../mock/mock.util";
import { AlunoJson } from "./aluno.json";
import { PontuacaoJson } from "./pontuacao.json";
import { StatusJson } from "./status.json";

export class HorasComplementaresJson {
  id: number;
  certificado: string;
  observacao: string;
  horas: number;
  data: Date;
  alunoId: number;
  aluno: AlunoJson;
  pontuacaoId: number;
  pontuacao: PontuacaoJson;
  statusId: number;
  status: StatusJson;

  mockObject(): HorasComplementaresJson {
    return {
      id: MockUtil.injectNumber(),
      certificado: MockUtil.injectString(),
      observacao: MockUtil.injectText(),
      horas: MockUtil.injectNumber(),
      data: MockUtil.injectDateTime(),
      alunoId: MockUtil.injectNumber(),
      aluno: AlunoJson.prototype.mockObject(),
      pontuacaoId: MockUtil.injectNumber(),
      pontuacao: PontuacaoJson.prototype.mockObject(),
      statusId: MockUtil.injectNumber(),
      status: StatusJson.prototype.mockObject()
    } as HorasComplementaresJson;
  }
}