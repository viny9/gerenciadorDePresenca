import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddTurmaComponent } from '../add-turma/add-turma.component';

@Component({
  selector: 'app-update-turma',
  templateUrl: './update-turma.component.html',
  styleUrls: ['./update-turma.component.css']
})
export class UpdateTurmaComponent implements OnInit {

  form:any

  constructor( private ref:MatDialogRef<AddTurmaComponent>, private db: FirebaseService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required])
    })
  }
  
  error() {
    return this.form.controls['nome'].hasError('required')? 'Você tem que digitar alguma coisa' : ''
  }
  
  close () {
    this.ref.close()
  }

  updateTurma() { 
    this.ref.close(this.form.value)
  }

}