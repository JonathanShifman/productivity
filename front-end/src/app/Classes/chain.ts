import {Time} from '@angular/common';

export class Chain {
  name: string;
  startingDate: Time;
  endingDate: Time;
  daysFrequency: number;
  sum: number;
  currency: string;


  constructor(name: string, startingDate: Time, endingDate: Time, daysFrequency: number, sum: number, currency: string) {
    this.name = name;
    this.startingDate = startingDate;
    this.endingDate = endingDate;
    this.daysFrequency = daysFrequency;
    this.sum = sum;
    this.currency = currency;
  }
}
