import { MockUtil } from "../mock/mock.util";
import { CursoJson } from "./curso.json";

export class AlunoJson {
  id: number;
  matricula: number;
  nome: string;
  cursoId: number;
  curso: CursoJson;

  mockObject(): AlunoJson {
    return {
      id: MockUtil.injectNumber(),
      matricula: MockUtil.injectNumber(),
      nome: MockUtil.injectName(),
      cursoId: MockUtil.injectNumber(),
      curso: CursoJson.prototype.mockObject()
    } as AlunoJson;
  }
}