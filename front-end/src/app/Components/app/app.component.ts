import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Options} from 'fullcalendar';
import {CalendarComponent} from 'ng-fullcalendar';
import {FinancialEvent} from '../../Classes/financial-event';
import {DatabaseService} from '../../Services/database.service';
import {Database} from '../../Classes/database';
import {Person} from '../../Classes/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  config;
  primaryMenuSelectedValue = 0;
  database: Database;

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private http: HttpClient, private databaseService: DatabaseService) {}

  ngOnInit() {
    const configFileObservable = this.http.get('assets/config.json');
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
    this.updateFromDatabase();
  }

  loadJSONs() {
    const fileObservable = this.http.get('assets/data.json');
    fileObservable.subscribe(tree => {
      localStorage.setItem('productivity', JSON.stringify(tree));
    });
  }

  updateFromDatabase() {
    this.database = this.databaseService.data;
  }

  onEventDrop(event) {
    const dateObject = event.detail.event.start._d;
    const newDate = dateObject.getFullYear() + '-' +
      this.twoDigitsString(dateObject.getMonth() + 1) + '-' + this.twoDigitsString(dateObject.getDate());
    console.log(newDate);
    this.databaseService.setNewEventDate(event.detail.event.id, newDate);
    this.updateFromDatabase();
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

  onFinancialEntityAdded(financialEntity: FinancialEvent) {
    console.log('Standalone added');
  }

  onFinancialEntityRemoved(financialEntityId: number) {
    console.log('Standalone removed');
  }

  onPersonAdded(person: Person) {
    console.log('Person added');
  }

  onPersonRemoved(person: Person) {
    console.log('Person removed');
  }
}
