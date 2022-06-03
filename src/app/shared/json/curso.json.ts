import { MockUtil } from "../mock/mock.util";
import { AreaJson } from "./area.json";

export class CursoJson {
  id: number;
  name: string;
  pontuacaoMin: number;
  areaId: number;
  area: AreaJson;

  mockObject(): CursoJson {
    return {
      id: MockUtil.injectNumber(),
      name: MockUtil.injectString(),
      pontuacaoMin: MockUtil.injectNumber(),
      areaId: 1,
      //areaId: MockUtil.injectNumber(),
      area: AreaJson.prototype.mockObject()
    } as CursoJson;
  }
}