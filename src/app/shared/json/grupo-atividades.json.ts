import { MockUtil } from "../mock/mock.util";

export class GrupoAtividadesJson {
  id: number;
  nome: string;

  mockObject(): GrupoAtividadesJson {
    return {
      id: MockUtil.injectNumber(),
      nome: MockUtil.injectString()
    } as GrupoAtividadesJson;
  }
}