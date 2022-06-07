import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTurmaComponent } from '../add-turma/add-turma.component';

@Component({
  selector: 'app-update-turma',
  templateUrl: './update-turma.component.html',
  styleUrls: ['./update-turma.component.css']
})
export class UpdateTurmaComponent implements OnInit {

  name:any = new FormControl('', [Validators.required])

  constructor( private ref:MatDialogRef<AddTurmaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.name.setValue(this.data.nome)
  }
  
  close () {
    this.ref.close()
  }

  updateTurma() { 
    this.ref.close(this.name.value)
  }

}