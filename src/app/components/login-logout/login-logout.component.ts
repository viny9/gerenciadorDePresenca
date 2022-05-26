import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from './../../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.css']
})
export class LoginLogoutComponent implements OnInit {

  @Output() notAdmin = new EventEmitter

  login = 'login'
  formSignin:any
  formSignup:any

  constructor(private dbAuth:AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      if(params.signup == undefined) {
        this.login = 'login'
      } else {
        this.login = params.signup
      }
    })
    this.createForm()
  }

  createForm() {
    this.formSignin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.formSignup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onSignin () {
    this.dbAuth.signin(this.formSignin.value.email, this.formSignin.value.password)
  }

  onSignup () {
    this.dbAuth.signup(this.formSignup.value.email, this.formSignup.value.password)
  }

  formError() {
    if(this.formSignin.controls['email'].invalid) {
      return this.formSignin.controls['email'].hasError('required')? 'Você tem que digitar algo' : ''
    } else { return }
  }

  notAdmins() {
    this.notAdmin.emit(true)
  }

}
