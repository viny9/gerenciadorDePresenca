import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  notAdmin:any = true
  user:any

  constructor(private dbAuth: AngularFireAuth, private db:AngularFirestore , private snackBar: MatSnackBar) {}

  //Login
  signin(email: any, password: any) {
      this.dbAuth.signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        this.typeOfUser(res)  //Verificar se usuario é um professor e passa o tipo de usuario para o localStore
        localStorage.setItem('user', JSON.stringify(res.user.uid))
      })
      .then(() => {
        //Para ter tempo de fazer tudo na função
        setTimeout(() => {
          window.location.reload()
        }, 500);
      })
      .catch((error: any) => {
       this.signinErrors(error)
      })
  }

  signinErrors(error:any) {
    if(error == 'FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).') {
      this.openSnackbar('Email ou senha incorreto')
    } else if(error == 'FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
      this.openSnackbar('Nenhuma conta com esse email')
    } else if (error == 'FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).') {
      this.openSnackbar('Email ou senha incorreto')
    } else {
      this.openSnackbar(error)
    }
  }

  //Cadastro
  signup(nome:any, email: any, password: any, turmas:any, userType:any) {

    if(userType == 'professor') {
      this.dbAuth.createUserWithEmailAndPassword(email, password)
        .then((res: any) => {
          const prof = {
            nome: nome, 
            turma: turmas,
            email: res.user.email,
            admin: true,
            professor: false,
            userType: userType,
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
          return this.signupErrors(error)
        })

    } else if(userType == 'admin') {
      this.dbAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        window.location.reload()
      })
      .catch((error: any) => {
        return this.signupErrors(error)
      })
    }
  }

  signupErrors(error:any) {
    if(error == 'FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).') {
      this.openSnackbar('Email invalido')
    } else if (error == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).') {
      this.openSnackbar('Senha tem que ter pelo menos 6 digitos')
    } else if(error == 'FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
      this.openSnackbar('Esse email já está em uso')
    } else {
      this.openSnackbar(error)
    }
  }
  
  typeOfUser (res:any){
    const professores:any = []
    this.db.collection('professores').get().subscribe((infos:any) => {
      infos.docs.forEach((element:any) => {
        professores.push(element.data())
      });

      const filtered = professores.filter((professor:any) => {
        if(professor.uid == res.user.uid) {
          return professor
        }
      })

        if(filtered.length == 0) {
          localStorage.setItem('tipo', JSON.stringify('admin'))
        }else if(filtered.length == 1){
          localStorage.setItem('tipo', JSON.stringify('professor'))
        }
      })
  }

  logout() {
    this.dbAuth.signOut()
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('professor')
    localStorage.removeItem('tipo')

    window.location.reload()
  }

  //Menssagem de erro
  openSnackbar(message: any) {
    this.snackBar.open(message, 'X', {
      duration: 1500,
      panelClass: 'snackbar',
      verticalPosition: 'top'
    })
  }
}
