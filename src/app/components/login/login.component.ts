import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSignin:any
  notAdmin: any
  login:any = false
  @Output() isLogged = new EventEmitter

  constructor(private dbAuth:AuthService) { }

//Adicionar um sessionStorage para o pais Responsavel para ver se melhorar deles entrar

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.formSignin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.notAdmin = new FormGroup({
      turma: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required]),
    })
  }

  onSignin () {
    this.dbAuth.signin(this.formSignin.value.email, this.formSignin.value.password)
  }

  formError() {
    if(this.formSignin.controls['email'].invalid) {
      return this.formSignin.controls['email'].hasError('required')? 'Você tem que digitar algo' : ''
    } else { return }
  }

  enter() {
    this.dbAuth.alunoInfos(this.notAdmin.value.turma, this.notAdmin.value.nome)
      this.dbAuth.isLogged 
  }
}
