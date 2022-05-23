import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-add-aluno',
  templateUrl: './add-aluno.component.html',
  styleUrls: ['./add-aluno.component.css']
})
export class AddAlunoComponent implements OnInit {

  form:any

  constructor(private ref:MatDialogRef<AddAlunoComponent>, private db:FirebaseService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      numeroDoResponsavel: new FormControl('', [Validators.required])
    })
  }

  formError() {
    if(this.form.controls['nome'].invalid) {
      return this.form.controls['nome'].hasError('required')? 'Você tem que digitar algo' : ''
    } else { return }
  }

  close() {
    this.ref.close()
  }
  
  addAluno() {
    this.ref.close(this.form.value)
  }

}
