import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FinancialService} from '../../Services/financial.service';
import {FinancialEvent} from '../../Classes/financial-event';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from 'ng-fullcalendar';
import {FinancialData} from '../../Classes/financial-data';
import {Chain} from '../../Classes/chain';
import {Options} from 'fullcalendar';
import {Time} from '@angular/common';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent implements OnInit {

  @Input() financialData: FinancialData;
  @Output() financialEntityAdded = new EventEmitter();
  @Output() financialEntityRemoved = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  submitNewEvent(name, date, sum, currency) {
    const newEvent: FinancialEvent = new FinancialEvent(0, name, date, sum, currency);
    this.financialEntityAdded.emit(newEvent);
  }

  removeEvent(financialEntityId: number) {
    this.financialEntityRemoved.emit(financialEntityId);
  }

  open(content) {
    this.modalService.open(content);
  }

}
