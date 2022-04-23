import { Injectable } from "@angular/core";

@Injectable()
export class DateUtil {
  static completeZero(value: number): string {
    if(value >= 0 && value < 10) return '0' + value;
    else return value + '';
  }

  //retorna: dd/mm/aaaa hh:mm
  static formatDateToString(data: Date) {
    return this.completeZero(data.getDate()) + '/' + this.completeZero((data.getMonth()+1)) + '/' + data.getFullYear() + ' ' + 
    this.completeZero(data.getHours()) + ':' + this.completeZero(data.getMinutes());
  }
}