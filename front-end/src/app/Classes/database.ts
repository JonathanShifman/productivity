import {FinancialEvent} from './financial-event';
import {Person} from './person';
import {Note} from './note';

export class Database {
  standalones: FinancialEvent[];
  people: Person[];
  notes: Note[];


  constructor(standalones: FinancialEvent[], people: Person[], notes: Note[]) {
    this.standalones = standalones;
    this.people = people;
    this.notes = notes;
  }

  static parse (jsonData) {
    const standalones: FinancialEvent[] = [];
    const people: Person[] = [];
    const notes: Note[] = [];

    for (const standaloneJsonData of jsonData['standalones']) {
      standalones.push(FinancialEvent.parse(standaloneJsonData));
    }

    for (const personJsonData of jsonData['people']) {
      people.push(Person.parse(personJsonData));
    }

    for (const personJsonData of jsonData['notes']) {
      notes.push(Note.parse(personJsonData));
    }

    return new Database(standalones, people, notes);
  }
}
