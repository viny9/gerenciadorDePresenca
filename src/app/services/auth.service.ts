import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  admin: any = true
  user:any
  testes:any 

  constructor(private dbAuth: AngularFireAuth, private db:AngularFirestore , private snackBar: MatSnackBar) {}

  signin(email: any, password: any) {
      this.dbAuth.signInWithEmailAndPassword(email, password).then((res: any) => {
        this.admin = true

         localStorage.setItem('user', JSON.stringify(res.user.uid))
        localStorage.setItem('token', JSON.stringify(this.generateToken()))
      })
      .then(() => {
        window.location.reload()
      })
      .catch((error: any) => {
        if(error == 'FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).') {
          this.openSnackbar('Email ou senha incorreto')
        } else if(error == 'FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
          this.openSnackbar('Nenhuma conta com esse email')
        } else if (error == 'FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).') {
          this.openSnackbar('Email ou senha incorreto')
        } else {
          this.openSnackbar(error)
        }
      })
  }

  private generateToken() {
    return Math.random().toString(36).substring(2, 12)
  }

  signup(nome:any, email: any, password: any, turmas:any) {
    this.dbAuth.createUserWithEmailAndPassword(email, password).then((res: any) => {
        this.admin = true //Setar admin como false depois
        const prof = {
          nome: nome, 
          turma: turmas,
          email: res.user.email,
          admin: true,
          uid: res.user.uid,
        }

        this.db.collection('professores').add(prof)
      })

      .then(() => {       //Para dar tempo de eviar as informações pro servidor antes de reniciar a pagina
        setTimeout(() => {     
          window.location.reload()
        }, 500);
      })

      .catch((error: any) => {
        if(error == 'FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).') {
          this.openSnackbar('Email invalido')
        } else if (error == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).') {
          this.openSnackbar('Senha tem que ter pelo menos 6 digitos')
        } else if(error == 'FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
          this.openSnackbar('Esse email já está em uso')
        } else {
          this.openSnackbar(error)
        }
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
