import { FirebaseService } from './../../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.css']
})
export class LoginLogoutComponent implements OnInit {

  @Output() isSignedIn = new EventEmitter

  login = 'login'
  formSignin:any
  formSignup:any

  constructor(private db:FirebaseService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {

    if(localStorage.getItem('user')!== null) {
      this.isSignedIn.emit(true)
    } else {
      this.isSignedIn.emit(false)
    }
    this.createForm()
    console.log(localStorage)
  }

  createForm() {
    this.formSignin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.formSignup = new FormGroup({
      // nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      // Cpassword: new FormControl('', [Validators.required]),
    })
  }

  onSignin () {
    this.db.signin(this.formSignin.value.email, this.formSignin.value.password)
      this.isSignedIn.emit(true)
  }

  onSignup () {
    this.db.signup(this.formSignup.value.email, this.formSignup.value.password)
    if(this.db.isLogged == true) {
      this.isSignedIn.emit(true)
    }
  }


  log() {
    this.db.logout()
    this.isSignedIn.emit(false)
  }

  formReset() {
    this.formSignin.reset()
    this.formSignup.reset()
  }

  formError() {
    if(this.formSignin.controls['email'].invalid) {
      return this.formSignin.controls['email'].hasError('required')? 'Você tem que digitar algo' : ''
    } else { return }
  }

  logins() {
    // const professores:any = []
    // this.db.getProfessor().subscribe((infos:any) => {
    //   infos.forEach((element:any) => {
    //     professores.push(element.data())
    //   });

    //   console.log(window.localStorage)
      
    //   for (let i = 0; i < professores.length; i++) {
    //     // console.log(professores[i].nome.includes(this.formLogin.value.nome))
    //     // console.log(professores[i].password.includes(this.formLogin.value.password))
    //     if(professores[i].email.includes(this.formLogin.value.email) && professores[i].password.includes(this.formLogin.value.password)) {
    //       this.loginStatus.emit(false)
    //     } else {
    //       this.openSnackbar()
    //     }
    //   }
    // })
    console.log(this.formSignin)
  }

  openSnackbar() {
    this.snackBar.open('Email ou Senha incorrtos', 'X', {
      duration: 1500,
      panelClass: 'snackbar',
      verticalPosition:'top'
    })
  }


}
