import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-turma',
  templateUrl: './add-turma.component.html',
  styleUrls: ['./add-turma.component.css']
})
export class AddTurmaComponent implements OnInit {

  form:any
  turno:any = 'Matutino'

  constructor( private ref:MatDialogRef<AddTurmaComponent>) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      turno: new FormControl('', [Validators.required])
    })
  }

  turnos(value:any) {
    this.turno = value.value
  }
  
  close () {
    this.ref.close()
  }

  addTurma() { 
    const turma = {
      nome: this.form.value.nome,
      turno: this.turno
    }

    this.ref.close(turma)
  }

}
