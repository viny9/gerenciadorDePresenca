import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  admin: any = true
  testes:any 

  constructor(private dbAuth: AngularFireAuth, private snackBar: MatSnackBar) {}

  signin(email: any, password: any) {
    this.dbAuth.signInWithEmailAndPassword(email, password).then((res: any) => {
        this.admin = true

        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('token', JSON.stringify(this.generateToken()))
      })

      .catch((error: any) => {
        this.openSnackbar('Email ou senha incorreto')
      })
  }

  private generateToken() {
    return Math.random().toString(36).substring(2, 12)
  }

  signup(email: any, password: any) {
    this.dbAuth.createUserWithEmailAndPassword(email, password, ).then((res: any) => {
        this.admin = true
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('token', JSON.stringify(this.generateToken()))

      })
      .then(() => {
        window.location.reload()
      })
      
      .catch((error: any) => {
        this.openSnackbar(error)
      })
  }

  logout() {
    this.dbAuth.signOut()
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.admin = false

    window.location.reload()
  }

  openSnackbar(message: any) {
    this.snackBar.open(message, 'X', {
      duration: 1500,
      panelClass: 'snackbar',
      verticalPosition: 'top'
    })
  }
}
