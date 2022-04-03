import { MockUtil } from "../mock/mock.util";
import { AreaJson } from "./area.json";

export class CursoJson {
  id: number;
  name: string;
  areaId: number;
  area: AreaJson;

  mockObject(): CursoJson {
    return {
      id: MockUtil.injectNumber(),
      name: MockUtil.injectString(),
      areaId: MockUtil.injectNumber(),
      area: AreaJson.prototype.mockObject()
    } as CursoJson;
  }
}