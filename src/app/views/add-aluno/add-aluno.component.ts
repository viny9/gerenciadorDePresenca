import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-aluno',
  templateUrl: './add-aluno.component.html',
  styleUrls: ['./add-aluno.component.css']
})
export class AddAlunoComponent implements OnInit {

  form:any

  constructor(private ref:MatDialogRef<AddAlunoComponent>) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      numeroDoResponsavel: new FormControl('', [Validators.required, Validators.minLength(11)])
    })
  }

  teste(e:any) {
    if(e.required == true) {
      return 'Você tem que digitar algo'
    } else if (e.minlength) {
      return 'Você tem que digitar 11 digitos'
    } else {
      return 
    }
  }

  close() {
    this.ref.close()
  }
  
  addAluno() {
    this.ref.close(this.form.value)
  }

}
