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
    this.database = this.databaseService.data;
  }

  loadJSONs() {
    const fileObservable = this.http.get('assets/data.json');
    fileObservable.subscribe(tree => {
      localStorage.setItem('productivity', JSON.stringify(tree));
    });
  }

  onEventDrop(event) {
    const dateObject = event.detail.event.start._d;
    const newDate = dateObject.getFullYear() + '-' +
      this.twoDigitsString(dateObject.getMonth() + 1) + '-' + this.twoDigitsString(dateObject.getDate());
    console.log(newDate);
    this.database.standalones[event.detail.event.id - 1].date = new Date(newDate);
    this.databaseService.updateDatabase();
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
    this.database.standalones.push(financialEntity);
    this.databaseService.updateDatabase();
  }

  onFinancialEntityRemoved(financialEntityId: number) {
    this.database.standalones.splice(financialEntityId - 1, 1);
    this.databaseService.updateDatabase();
  }

  onPersonAdded(person: Person) {
    this.database.people.push(person);
    this.databaseService.updateDatabase();
  }

  onPersonRemoved(personId: number) {
    this.database.people.splice(personId - 1, 1);
    this.databaseService.updateDatabase();
  }
}
