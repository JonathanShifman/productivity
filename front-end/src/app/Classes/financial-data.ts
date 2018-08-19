import {FinancialEvent} from './financial-event';

export class FinancialData {

  chains;
  standalones: FinancialEvent[];


  constructor(chains, standalones: FinancialEvent[]) {
    this.chains = chains;
    this.standalones = standalones;
  }
}
