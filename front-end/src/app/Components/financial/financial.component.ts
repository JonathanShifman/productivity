import {Component, Input, OnInit} from '@angular/core';
import {FinancialService} from '../../Services/financial.service';
import {FinancialEvent} from '../../Classes/financial-event';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent implements OnInit {

  @Input() financialData;

  constructor(private financialService: FinancialService) { }

  ngOnInit() {
    this.financialData = this.financialService.financialData;
  }

  submitNewEvent(name, date, sum, currency) {
    const newEvent: FinancialEvent = new FinancialEvent(name, date, sum, currency);
    this.financialData.standalones.push(newEvent);
    this.financialService.updateStorageFromMemory();
  }

  removeEvent(index: number) {
    this.financialData.standalones.splice(index, 1);
    this.financialService.updateStorageFromMemory();
  }

}
