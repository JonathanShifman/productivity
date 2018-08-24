import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from 'ng-fullcalendar';

import { AppComponent } from './Components/app/app.component';
import { FinancialComponent } from './Components/financial/financial.component';
import {HttpClientModule} from '@angular/common/http';
import { NotesComponent } from './Components/notes/notes.component';
import { PeopleComponent } from './Components/people/people.component';

@NgModule({
  declarations: [
    AppComponent,
    FinancialComponent,
    NotesComponent,
    PeopleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
