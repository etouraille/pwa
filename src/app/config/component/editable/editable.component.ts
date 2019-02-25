import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Factor} from '../../../model/factor';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss']
})
export class EditableComponent implements OnInit {

  @Input() factor: Factor;
  @Output() upsert: EventEmitter<Factor> = new EventEmitter<Factor>();

  edition: boolean;
  constructor() { }

  ngOnInit() {
    this.edition = false;
  }

  edit() {
    console.log( 'edit for sure');
    this.edition = true;
  }

  edited() {
    this.edition = false;
    this.upsert.emit(this.factor);
  }
}
