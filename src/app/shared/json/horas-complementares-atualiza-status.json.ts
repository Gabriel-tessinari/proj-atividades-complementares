import { MockUtil } from "../mock/mock.util";

export class HorasComplementaresAtualizaStatusJson {
  id: number;
  statusId: number;
  observacao: string;

  mockObject(): HorasComplementaresAtualizaStatusJson {
    return {
      id: MockUtil.injectNumber(),
      statusId: MockUtil.injectNumber(),
      observacao: MockUtil.injectText(),
    } as HorasComplementaresAtualizaStatusJson;
  }
}