import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AddTurmaComponent } from '../add-turma/add-turma.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-aluno',
  templateUrl: './update-aluno.component.html',
  styleUrls: ['./update-aluno.component.css']
})
export class UpdateAlunoComponent implements OnInit {

  form:any

  constructor( private ref:MatDialogRef<AddTurmaComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      numeroDoResponsavel: new FormControl('', [Validators.required])
    })
    
    this.setFormValues()
  }
  
  setFormValues() {
    this.form.controls['nome'].setValue(this.data.nome)
    this.form.controls['numeroDoResponsavel'].setValue(this.data.numeroDoResponsavel)
  }
  
  close () {
    this.ref.close()
  }

  updateTurma() { 
    this.ref.close(this.form.value)
  }

}