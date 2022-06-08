import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  notAdmin: any = true
  isLogged: any = false
  turma: any
  user: any
  aluno: any

  constructor(private dbAuth: AngularFireAuth, private db: AngularFirestore, private snackBar: MatSnackBar, private router: Router) {}

  canActivate() {
    if (sessionStorage['tipo'] != null) {
      return true
    } else {
      return false
    }
  }

  signin(email: any, password: any) {
    const users: any = []

    this.db.collection('users').get().subscribe((res: any) => {
      res.docs.forEach((element: any) => {
        users.push(element.data())
      });

      const user = users.filter((user: any) => {
        if (user.email == email) {
          return user
        }
      })

      if (user[0] == undefined) {
        this.openSnackbar('Email ou senha incorretos')
      } else if (user[0].password != password) {
        this.openSnackbar('Email ou senha incorretos')
      } else if (user[0].email != email) {
        this.openSnackbar('Email ou senha incorretos')
      } else if (user[0].email === email && user[0].password == password) {
        sessionStorage.setItem('tipo', user[0].type)
        sessionStorage.setItem('id', user[0].id)
        window.location.reload()
      } else {
        this.openSnackbar('Ocorreu um erro')
      }
    })
  }

  signup(nome: any, email: any, password: any, turmas: any, userType: any) {
    const id = Math.random().toString(12).substring(1)

    if (userType == 'admin') {
      const user = {
        nome: nome,
        password: password,
        email: email,
        type: userType,
        id: id
      }

      this.db.collection('users').add(user)
        .then(() => window.location.reload())
        .catch((e) => this.openSnackbar('Ocorreu um erro'))

    } else if (userType == 'professor') {
      const prof = {
        nome: nome,
        turma: turmas,
        email: email,
        password: password,
        type: userType,
        id: id
      }

      this.db.collection('users').add(prof)
        .then(() => window.location.reload())
        .catch((e) => this.openSnackbar('Ocorreu um erro'))
    }
  }

  alunoSignin(turma: any, nome: any) {
    this.db.collection('turmas').get().subscribe((res: any) => {
      const selectedTurma = this.getTurma(turma, res)

      if (selectedTurma != undefined) {
        this.getAluno(selectedTurma, nome)
      }
    })
  }

  getTurma(turmad: any, res: any) {
    const ids = res.docs
    const names = res.docs.map((res: any) => {
      return res.data().nome
    })
    const index = names.indexOf(turmad)

    if (index == -1) {
      this.openSnackbar('Turma ou aluno incorreto')
      this.isLogged = false
    } else if (index >= 0) {
      this.isLogged = true
      return ids[index].id
    }
  }

  getAluno(turma: any, nome: any) {
    this.db.collection('turmas').doc(turma).collection('alunos').get().subscribe((res: any) => {

      const ids = res.docs
      const names = res.docs.map((res: any) => {
        return res.data().nome
      })

      const index = names.indexOf(nome)

      if (index == -1) {
        this.openSnackbar('Turma ou aluno incorreto')
        this.isLogged = false
      } else if (index >= 0) {
        this.aluno = ids[index].id
        this.isLogged = true
      }

      if (this.aluno == undefined) {
        this.turma = undefined
      } else {
        this.router.navigate([`/turma/${turma}/aluno/${this.aluno}`])
        sessionStorage.setItem('tipo', 'user')

        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
    })
  }

  logOut() {
    this.dbAuth.signOut()
      .then(() => {
        sessionStorage.removeItem('tipo')
        sessionStorage.removeItem('id')
      })
      .then(() => {
        window.location.reload()
      })
  }

  openSnackbar(message: any) {
    this.snackBar.open(message, 'X', {
      duration: 1500,
      panelClass: ['snackBar'],
      verticalPosition: 'top',
    })
  }

}
