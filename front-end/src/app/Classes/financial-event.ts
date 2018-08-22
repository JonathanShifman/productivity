import {Time} from '@angular/common';

export class FinancialEvent {
  id: number;
  name: string;
  date: Time;
  sum: number;
  currency: string;

  constructor(id: number, name: string, date: Time, sum: number, currency: string) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.sum = sum;
    this.currency = currency;
  }
}
