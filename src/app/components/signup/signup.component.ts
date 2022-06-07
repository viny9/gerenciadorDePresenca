import { Observable, startWith, map } from 'rxjs';
import { FirebaseService } from './../../services/firebase.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA]
  addTurmas:any = []
  turmas:any = []
  userType:any = 'professor'
  formSignup:any
  filterInput: Observable<string[]>;
  input = new FormControl('', [Validators.required]) 


  constructor(private db:FirebaseService, private dbAuth:AuthService) {
    this.db.titleInfos = {
      title: 'Cadastro'
    }

    this.filterInput = this.input.valueChanges.pipe(
      startWith(null),
      map((turma: string | null) => (turma ? this._filter(turma) : this.turmas.slice())),
    );
   }

  ngOnInit(): void {
    this.getTurmas()
    this.createForm()
  }

  getTurmas() {
    this.db.getTurmas().subscribe((res:any) => {
      res.forEach((element:any) => {
        this.turmas.push(element.data())
      });
    })
  }

  createForm() {
    this.formSignup = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      turma: new FormControl(),
    })
  }

  onSignup () {
    this.dbAuth.signup(this.formSignup.value.nome, this.formSignup.value.email, this.formSignup.value.password, this.addTurmas, this.userType)
  }

  type(tipo:any) {
    this.userType = tipo.value
  }

//AutoComplete and Chips
  selected(event:MatAutocompleteSelectedEvent) {
    const input = this.formSignup.controls.turma
    this.addTurmas.push(event.option.viewValue)

    input.setValue(null)
  }

  add(event:MatChipInputEvent) {
    const input = this.formSignup.controls.turma
    const value = (event.value || '').trim()

    if(value) {
      this.addTurmas.push(value)
    }

    event.chipInput!.clear()
    input.setValue(null)
  }

  removedTurmas(turma:any) {
    const index = this.addTurmas.indexOf(turma)

    if(index >= 0) {
      this.addTurmas.splice(index, 1)
    }
  }

  private _filter(value:any): string[] {
    const filterValue = value.toLowerCase()

    return this.turmas.filter((turma:any) => {
      turma.toLowerCase().includes(filterValue)
    })
  }

 
 

}
