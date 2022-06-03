import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddTurmaComponent } from '../add-turma/add-turma.component';

@Component({
  selector: 'app-update-turma',
  templateUrl: './update-turma.component.html',
  styleUrls: ['./update-turma.component.css']
})
export class UpdateTurmaComponent implements OnInit {

  form:any

  constructor( private ref:MatDialogRef<AddTurmaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.createForm()
  }
  
  createForm() {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required])
    })

    this.form.controls['nome'].setValue(this.data.nome)
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