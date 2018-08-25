import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Note} from '../../Classes/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() notes: Note[];
  @Output() noteAdded = new EventEmitter();
  @Output() noteRemoved = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  submitNewNote(name) {
    const newNote: Note = new Note(0, name);
    this.noteAdded.emit(newNote);
  }

  removeNote(noteId: number) {
    this.noteRemoved.emit(noteId);
  }

  open(content) {
    this.modalService.open(content);
  }

}
