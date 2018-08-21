import {Component, Input, OnInit} from '@angular/core';
import {FinancialService} from '../../Services/financial.service';
import {FinancialEvent} from '../../Classes/financial-event';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FinancialData} from '../../Classes/financial-data';
import {Chain} from '../../Classes/chain';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent implements OnInit {

  @Input() financialData: FinancialData;
  financialDataType = 0;

  constructor(private financialService: FinancialService, private modalService: NgbModal) { }

  ngOnInit() {
    this.financialData = this.financialService.financialData;
  }

  submitNewEvent(name, date, sum, currency) {
    const newEvent: FinancialEvent = new FinancialEvent(name, date, sum, currency);
    this.financialData.standalones.push(newEvent);
    this.financialService.updateStorageFromMemory();
  }

  submitNewChain(name, startingDate, endingDate, daysFrequency, sum, currency) {
    const newChain: Chain = new Chain(name, startingDate, endingDate, daysFrequency, sum, currency);
    this.financialData.chains.push(newChain);
    this.financialService.updateStorageFromMemory();
  }

  removeEvent(index: number) {
    this.financialData.standalones.splice(index, 1);
    this.financialService.updateStorageFromMemory();
  }

  removeChain(index: number) {
    this.financialData.chains.splice(index, 1);
    this.financialService.updateStorageFromMemory();
  }

  open(content) {
    this.modalService.open(content);
  }

}
