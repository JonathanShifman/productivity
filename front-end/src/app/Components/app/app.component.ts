import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  config;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const configFileObservable = this.http.get('assets/config/config.json');
    configFileObservable.subscribe(configTree => {
      this.config = configTree;
      if (this.config['shouldLoadFromJSON']) {
        this.loadJSONs();
      }
    });
  }

  loadJSONs() {
    const fileObservable = this.http.get('assets/data/financial.json');
    fileObservable.subscribe(tree => {
      localStorage.setItem('financial', JSON.stringify(tree));
    });
  }

}
