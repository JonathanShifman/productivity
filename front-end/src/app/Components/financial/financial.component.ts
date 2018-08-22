import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  financialDataType = 0;

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private financialService: FinancialService, private modalService: NgbModal) { }

  ngOnInit() {
    this.financialData = this.financialService.financialData;

    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      height: 650,
      defaultDate: '2018-01-01',
      events: this.financialData.getStandaloneCalendarEvents()
    };
  }

  submitNewEvent(name, date, sum, currency) {
    const newEvent: FinancialEvent = new FinancialEvent(0, name, date, sum, currency);
    this.financialData.standalones.push(newEvent);
    this.financialService.updateStorageFromMemory();
  }

  submitNewChain(name, startingDate, endingDate, daysFrequency, sum, currency) {
    const newChain: Chain = new Chain(0, name, startingDate, endingDate, daysFrequency, sum, currency);
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

  onEventDrop(event) {
    const dateObject = event.detail.event.start._d;
    const newDate = dateObject.getFullYear() + '-' +
this.twoDigitsString(dateObject.getMonth() + 1) + '-' + this.twoDigitsString(dateObject.getDate());
    console.log(newDate);
    this.financialService.setNewDate(event.detail.event.id, newDate);
    this.financialData = this.financialService.financialData;
  }

  twoDigitsString(num: number) {
    if (num >= 10) {
      return num.toString();
    }
    return '0' + num.toString();
  }

}
