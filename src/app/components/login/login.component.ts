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

  constructor(private dbAuth:AuthService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.formSignin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
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

}
