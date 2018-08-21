import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './Components/app/app.component';
import { FinancialComponent } from './Components/financial/financial.component';
import {HttpClientModule} from '@angular/common/http';
import {FinancialService} from './Services/financial.service';

@NgModule({
  declarations: [
    AppComponent,
    FinancialComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [FinancialService],
  bootstrap: [AppComponent]
})
export class AppModule { }
