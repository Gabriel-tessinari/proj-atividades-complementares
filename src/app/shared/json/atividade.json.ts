import { MockUtil } from "../mock/mock.util";
import { GrupoAtividadesJson } from "./grupo-atividades.json";

export class AtividadeJson {
  id: number;
  nome: string;
  grupoAtividadeId: number;
  grupoAtividades: GrupoAtividadesJson;
  converterHoras: boolean;

  mockObject(): AtividadeJson {
    return {
      id: MockUtil.injectNumber(),
      nome: MockUtil.injectString(),
      grupoAtividadeId: MockUtil.injectNumber(),
      grupoAtividades: GrupoAtividadesJson.prototype.mockObject(),
      converterHoras: MockUtil.injectOneOf([true, false])
    } as AtividadeJson;
  }
}