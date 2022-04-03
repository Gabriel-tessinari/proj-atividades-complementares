import { MockUtil } from "../mock/mock.util";

export class AreaJson {
  id: number;
  name: string;

  mockObject(): AreaJson {
    return {
      id: MockUtil.injectNumber(),
      name: MockUtil.injectString()
    } as AreaJson;
  }
}