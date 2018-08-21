import {FinancialEvent} from './financial-event';
import {Chain} from './chain';

export class FinancialData {

  chains: Chain[];
  standalones: FinancialEvent[];


  constructor(chains: Chain[], standalones: FinancialEvent[]) {
    this.chains = chains;
    this.standalones = standalones;
  }
}
