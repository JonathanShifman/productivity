import { Injectable } from '@angular/core';
import {FinancialData} from '../Classes/financial-data';
import {Person} from '../Classes/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _people: Person[];

  constructor() {
    this.updateMemoryFromStorage();
  }

  updateMemoryFromStorage() {
    this._people = JSON.parse(localStorage.getItem('people'));
  }

  updateStorageFromMemory() {
    localStorage.setItem('people', JSON.stringify(this._people));
  }

  get people(): Person[] {
    return this._people;
  }
}
