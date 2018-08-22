import {Time} from '@angular/common';

export class Chain {
  id: number;
  name: string;
  startingDate: Time;
  endingDate: Time;
  daysFrequency: number;
  sum: number;
  currency: string;


  constructor(id: number, name: string, startingDate: Time, endingDate: Time, daysFrequency: number, sum: number, currency: string) {
    this.id = id;
    this.name = name;
    this.startingDate = startingDate;
    this.endingDate = endingDate;
    this.daysFrequency = daysFrequency;
    this.sum = sum;
    this.currency = currency;
  }
}
