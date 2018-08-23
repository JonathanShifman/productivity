import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PersonService} from '../../Services/person.service';
import {Person} from '../../Classes/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people: Person[];

  constructor(private personService: PersonService, private modalService: NgbModal) { }

  ngOnInit() {
    this.people = this.personService.people['people'];
  }

  submitNewPerson(name, date) {
    const newPerson: Person = new Person(0, name, date);
    this.people.push(newPerson);
    this.personService.updateStorageFromMemory();
  }

  removePerson(index: number) {
    this.people.splice(index, 1);
    this.personService.updateStorageFromMemory();
  }

  open(content) {
    this.modalService.open(content);
  }

}
