import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FinancialService} from '../../Services/financial.service';
import {Options} from 'fullcalendar';
import {CalendarComponent} from 'ng-fullcalendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  config;
  primaryMenuSelectedValue = 0;
  financialData;

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private http: HttpClient, private financialService: FinancialService) {}

  ngOnInit() {
    const configFileObservable = this.http.get('assets/config/config.json');
    configFileObservable.subscribe(configTree => {
      this.config = configTree;
      if (this.config['shouldLoadFromJSON']) {
        this.loadJSONs();
      }
    });

    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      height: 650,
      defaultDate: '2018-01-01'
    };
    this.financialData = this.financialService.financialData;
  }

  loadJSONs() {
    const jsonsMap = {
      'financial': 'assets/data/financial.json',
      'people': './assets/data/people.json'
    };

    for (const name of Object.keys(jsonsMap)) {
      const path = jsonsMap[name];
      const fileObservable = this.http.get(path);
      fileObservable.subscribe(tree => {
        localStorage.setItem(name, JSON.stringify(tree));
      });
    }
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

  onViewRender(event) {
    console.log(event);
  }

}
