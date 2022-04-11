import { MockUtil } from "../mock/mock.util";

export class AtividadeJson {
  nome: string;
  grupoAtividadeId: number;
  converterHoras: boolean;

  mockObject(): AtividadeJson {
    return {
      nome: MockUtil.injectString(),
      grupoAtividadeId: MockUtil.injectNumber(),
      converterHoras: MockUtil.injectOneOf([true, false])
    } as AtividadeJson;
  }
}