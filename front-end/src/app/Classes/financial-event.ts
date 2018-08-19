import {Time} from '@angular/common';

export class FinancialEvent {
  name: string;
  date: Time;
  sum: number;
  currency: string;

  constructor(name: string, date: Time, sum: number, currency: string) {
    this.name = name;
    this.date = date;
    this.sum = sum;
    this.currency = currency;
  }
}
