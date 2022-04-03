import { MockUtil } from "../mock/mock.util";

export class StatusJson {
  id: number;
  descricao: string;

  mockObject(): StatusJson {
    return {
      id: MockUtil.injectNumber(),
      descricao: MockUtil.injectOneOf(['Aprovado', 'Recusado', 'Pendente'])
    } as StatusJson;
  }
}