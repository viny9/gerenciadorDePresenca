import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from './../../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.css']
})
export class LoginLogoutComponent implements OnInit {

  @Output() notAdmin = new EventEmitter

  separatorKeysCodes: number[] = [ENTER, COMMA];
  addTurmas:any = []
  turmas:any = []

  teste1: Observable<string[]>;
  input = new FormControl() 

  login = 'login'
  formSignin:any
  formSignup:any

  constructor(private dbAuth:AuthService, private db:FirebaseService , private route: ActivatedRoute) { 
    this.db.titleInfos = {
      title: 'Cadastro'
    }

    this.teste1 = this.input.valueChanges.pipe(
      startWith(null),
      map((turma: string | null) => (turma ? this._filter(turma) : this.turmas.slice())),
    );
  }

  ngOnInit(): void {
    console.log(this.input)
    this.route.params.subscribe((params:any) => {
      if(params.signup == undefined) {
        this.login = 'login'
      } else {
        this.login = params.signup
      }
    })
    this.createForm()
    this.getTurmas()
    this.input = this.formSignup.controls.turma
    console.log(this.formSignup.controls.turma)
  }

  createForm() {
    this.formSignin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.formSignup = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      turma: new FormControl(),
    })
  }

  onSignin () {
    this.dbAuth.signin(this.formSignin.value.email, this.formSignin.value.password)
  }

  onSignup () {
    this.dbAuth.signup(this.formSignup.value.nome, this.formSignup.value.email, this.formSignup.value.password, this.addTurmas)
  }

  formError() {
    if(this.formSignin.controls['email'].invalid) {
      return this.formSignin.controls['email'].hasError('required')? 'Você tem que digitar algo' : ''
    } else { return }
  }

  notAdmins() {
    this.notAdmin.emit(true)
  }

  getTurmas() {
    this.db.getTurmas().subscribe((infos:any) => {
      infos.forEach((element:any) => {
        this.turmas.push(element.data())
      });
    })
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

  selected(event:MatAutocompleteSelectedEvent) {
    const input = this.formSignup.controls.turma
    this.addTurmas.push(event.option.viewValue)
    // this.teste.nativeElement.value = ''

    input.setValue(null)
  }

  private _filter(value:any): string[] {
    const filterValue = value.toLowerCase()

    return this.turmas.filter((turma:any) => {
      turma.toLowerCase().includes(filterValue)
    })
  }

}
