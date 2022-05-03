import { MockUtil } from "../mock/mock.util";
import { GrupoAtividadesJson } from "./grupo-atividades.json";

export class AtividadeJson {
  id: number;
  nome: string;
  grupoAtividadesId: number;
  grupoAtividades: GrupoAtividadesJson;
  converterHoras: boolean;

  mockObject(): AtividadeJson {
    return {
      id: MockUtil.injectNumber(),
      nome: "Trabalhos desenvolvidos com orientação docente, apresentados na Instituição (extra sala de aula e extra disciplina específica), em eventos científicos específicos ou seminários multidisciplinares (dentre eles o Inovaweek).",
      grupoAtividadesId: 1,
      grupoAtividades: GrupoAtividadesJson.prototype.mockObject(),
      converterHoras: MockUtil.injectOneOf([true, false])
    } as AtividadeJson;
  }
}