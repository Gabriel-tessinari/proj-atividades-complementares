import { Injectable } from "@angular/core";
import { faker } from "@faker-js/faker";

faker.locale = "pt_BR";

@Injectable()
export class MockUtil {
  //strings:
  static injectString(): string {
    return faker.lorem.word();
  }

  static injectText(): string {
    return faker.lorem.paragraphs();
  }

  static injectName(): string {
    return faker.name.findName();
  }

  //number:
  static injectNumber(max?: number): number {
    if(max == null) max = 100;
    return faker.datatype.number(max);
  }

  //array element:
  static injectOneOf(array: any[]): any {
    return faker.random.arrayElement(array);
  }
}