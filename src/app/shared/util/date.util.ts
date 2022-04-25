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

  //retorna: true se data1 for mais recente que data2 
  static isNewer(data1: Date, data2: Date): boolean {
    if(data1.getFullYear() > data2.getFullYear() || 
    (data1.getFullYear() == data2.getFullYear() && data1.getMonth() > data2.getMonth()) ||
    (data1.getFullYear() == data2.getFullYear() && data1.getMonth() == data2.getMonth() && 
    data1.getDate() > data2.getDate()) ||
    (data1.getFullYear() == data2.getFullYear() && data1.getMonth() == data2.getMonth() && 
    data1.getDate() == data2.getDate() && data1.getHours() > data2.getHours()) ||
    (data1.getFullYear() == data2.getFullYear() && data1.getMonth() == data2.getMonth() &&
    data1.getDate() == data2.getDate() && data1.getHours() == data2.getHours() &&
    data1.getMinutes() > data2.getMinutes())) return true;

    return false;
  }
}