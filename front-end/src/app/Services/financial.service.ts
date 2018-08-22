import { Injectable } from '@angular/core';
import { FinancialData } from '../Classes/financial-data';
import {Time} from '@angular/common';

@Injectable()
export class FinancialService {

  private _financialData: FinancialData;

  constructor() {
    this.updateMemoryFromStorage();
  }

  updateMemoryFromStorage() {
    const jsonData = JSON.parse(localStorage.getItem('financial'));
    this._financialData = new FinancialData(jsonData['chains'], jsonData['standalones']);
  }

  updateStorageFromMemory() {
    localStorage.setItem('financial', JSON.stringify(this._financialData));
  }

  get financialData(): FinancialData {
    return this._financialData;
  }

  setNewDate(eventId: number, date) {
    for (const event of this._financialData.standalones) {
      if (event.id === eventId) {
        event.date = date;
      }
    }
    this.updateStorageFromMemory();
  }

}
