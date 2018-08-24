import { Injectable } from '@angular/core';
import {Database} from '../Classes/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private _data: Database;

  constructor() {
    this.updateMemoryFromStorage();
  }

  updateMemoryFromStorage() {
    this._data = Database.parse(JSON.parse(localStorage.getItem('productivity')));
  }

  updateStorageFromMemory() {
    localStorage.setItem('productivity', JSON.stringify(this._data));
  }

  get data(): Database {
    return this._data;
  }

  setNewEventDate(eventId: number, date) {
    for (const event of this._data.standalones) {
      if (event.id === eventId) {
        event.date = date;
      }
    }
    this.updateStorageFromMemory();
  }
}
