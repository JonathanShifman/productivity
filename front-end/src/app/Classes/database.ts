import {FinancialEvent} from './financial-event';
import {Person} from './person';

export class Database {
  standalones: FinancialEvent[];
  people: Person[];


  constructor(standalones: FinancialEvent[], people: Person[]) {
    this.standalones = standalones;
    this.people = people;
  }

  static parse (jsonData) {
    const standalones = [];
    const people = [];

    for (const standaloneJsonData of jsonData['standalones']) {
      standalones.push(FinancialEvent.parse(standaloneJsonData));
    }

    for (const personJsonData of jsonData['people']) {
      people.push(Person.parse(personJsonData));
    }

    return new Database(standalones, people);
  }
}
