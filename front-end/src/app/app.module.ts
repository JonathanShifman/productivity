import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
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
    HttpClientModule
  ],
  providers: [FinancialService],
  bootstrap: [AppComponent]
})
export class AppModule { }
