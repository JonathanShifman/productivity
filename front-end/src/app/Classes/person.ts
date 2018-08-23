import {Time} from '@angular/common';

export class Person {
  id: number;
  name: string;
  date: Time;

  constructor(id: number, name: string, birthday: Time) {
    this.id = id;
    this.name = name;
    this.date = birthday;
  }
}
