import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Person} from '../../Classes/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  @Input() people: Person[];
  @Output() personAdded = new EventEmitter();
  @Output() personRemoved = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  submitNewPerson(name, date) {
    const newPerson: Person = new Person(0, name, date);
    this.personAdded.emit(newPerson);
  }

  removePerson(personId: number) {
    this.personRemoved.emit(personId);
  }

  open(content) {
    this.modalService.open(content);
  }

}
