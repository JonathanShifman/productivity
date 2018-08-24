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

  static parse(standaloneJsonData): Person {
    const id = standaloneJsonData['id'];
    const name = standaloneJsonData['name'];
    const date = standaloneJsonData['date'];
    return new Person(id, name, date);
  }
}
