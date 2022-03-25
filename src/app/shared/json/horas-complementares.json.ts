import { AlunoJson } from "./aluno.json";
import { PontuacaoJson } from "./pontuacao.json";
import { StatusJson } from "./status.json";

export class HorasComplementaresJson {
  id: number;
  certificado: string;
  observacao: string;
  horas: number;
  alunoId: number;
  aluno: AlunoJson;
  pontuacaoId: number;
  pontuacao: PontuacaoJson;
  statusId: number;
  status: StatusJson;
}