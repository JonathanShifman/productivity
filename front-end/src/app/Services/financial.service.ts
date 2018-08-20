import { Injectable } from '@angular/core';
import {FinancialData} from '../Classes/financial-data';

@Injectable()
export class FinancialService {

  private _financialData: FinancialData;

  constructor() {
    this.updateMemoryFromStorage();
  }

  updateMemoryFromStorage() {
    this._financialData = JSON.parse(localStorage.getItem('financial'));
  }

  updateStorageFromMemory() {
    localStorage.setItem('financial', JSON.stringify(this._financialData));
  }

  get financialData(): FinancialData {
    return this._financialData;
  }

}
