import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddTurmaComponent } from '../add-turma/add-turma.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-aluno',
  templateUrl: './update-aluno.component.html',
  styleUrls: ['./update-aluno.component.css']
})
export class UpdateAlunoComponent implements OnInit {

  form:any

  constructor( private ref:MatDialogRef<AddTurmaComponent>, private db: FirebaseService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      numeroDoResponsavel: new FormControl('', [Validators.required])
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