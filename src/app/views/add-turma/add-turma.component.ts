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

  addTurma() { 
    this.ref.close(this.form.value)
  }

}
