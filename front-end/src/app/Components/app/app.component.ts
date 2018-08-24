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
    console.log(event);
    const dateObject = event.detail.event.start._d;
    const newDateString = dateObject.getFullYear() + '-' +
      this.twoDigitsString(dateObject.getMonth() + 1) + '-' + this.twoDigitsString(dateObject.getDate());
    this.findEntityById(this.database.standalones, event.detail.event.id).date = new Date(newDateString);
    this.databaseService.updateDatabase();
  }

  twoDigitsString(num: number) {
    if (num >= 10) {
      return num.toString();
    }
    return '0' + num.toString();
  }

  onViewRender(event) {
    const startDate = this.getDateFromMoment(event.detail.view.start);
    const endDate = this.getDateFromMoment(event.detail.view.end);

    const eventsToRender = this.getEventsToRender(startDate, endDate);
    this.ucCalendar.fullCalendar('renderEvents', eventsToRender);
  }

  onFinancialEntityAdded(financialEntity: FinancialEvent) {
    financialEntity.id = this.getNextEntityId(this.database.standalones);
    this.database.standalones.push(financialEntity);
    this.databaseService.updateDatabase();
  }

  onFinancialEntityRemoved(financialEntityId: number) {
    this.database.standalones.splice(this.findEntityIndexById(this.database.standalones, financialEntityId), 1);
    this.databaseService.updateDatabase();
  }

  onPersonAdded(person: Person) {
    person.id = this.getNextEntityId(this.database.people);
    this.database.people.push(person);
    this.databaseService.updateDatabase();
  }

  onPersonRemoved(personId: number) {
    this.database.people.splice(this.findEntityIndexById(this.database.people, personId), 1);
    this.databaseService.updateDatabase();
  }

  findEntityIndexById(entities: any[], entityId: number) {
    for (let i = 0; i < entities.length; i++) {
      if (entities[i].id === entityId) {
        return i;
      }
    }
    return -1;
  }

  findEntityById(entities: any[], entityId: number) {
    const index = this.findEntityIndexById(entities, entityId);
    if (index >= 0) {
      return entities[index];
    }
    return null;
  }

  getNextEntityId(entities: any[]) {
    if (entities.length === 0) {
      return 1;
    }
    return entities[entities.length - 1].id + 1;
  }

  getDateFromMoment(moment) {
    const day = moment._d.getDate();
    const month = moment._d.getMonth() + 1;
    const year = moment._d.getFullYear();

    const dateString = year + '-' + month + '-' + day;
    return new Date(dateString);
  }

  private getEventsToRender(startDate: Date, endDate: Date) {
    const eventsToRender = [];
    for (const event of this.database.standalones) {
      console.log(event);
      console.log(event.date);
      console.log(startDate);
      console.log(endDate);
      if (event.date >= startDate && event.date <= endDate) {
        eventsToRender.push(event.getCalendarFormatEvent());
      }
    }
    return eventsToRender;
  }
}
