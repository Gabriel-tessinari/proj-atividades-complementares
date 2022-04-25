import { MockUtil } from "../mock/mock.util";

export class PontuacaoJson {
  id: number;
  pontos: number;
  numeroMaximo: number;
  atividadeId: number;
  cursoId: number;

  mockObject(): PontuacaoJson {
    return {
      id: MockUtil.injectNumber(),
      pontos: MockUtil.injectNumber(),
      numeroMaximo: MockUtil.injectNumber(),
      atividadeId: MockUtil.injectNumber(),
      cursoId: MockUtil.injectNumber()
    } as PontuacaoJson;
  }
}