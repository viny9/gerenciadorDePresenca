import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-turma',
  templateUrl: './add-turma.component.html',
  styleUrls: ['./add-turma.component.css']
})
export class AddTurmaComponent implements OnInit {

  constructor( private ref:MatDialogRef<AddTurmaComponent>) { }

  ngOnInit(): void {
  }

  addTurma() { 
    this.ref.close()
  }

  close () {
    this.ref.close()
  }

}
