import { MockUtil } from "../mock/mock.util";
import { AtividadeJson } from "./atividade.json";

export class PontuacaoJson {
  id: number;
  pontos: number;
  numeroMaximo: number;
  atividadeId: number;
  atividade: AtividadeJson;
  cursoId: number;

  mockObject(): PontuacaoJson {
    return {
      id: MockUtil.injectNumber(),
      pontos: MockUtil.injectNumber(),
      numeroMaximo: MockUtil.injectNumber(),
      atividadeId: MockUtil.injectNumber(),
      atividade: AtividadeJson.prototype.mockObject(),
      cursoId: MockUtil.injectNumber()
    } as PontuacaoJson;
  }
}