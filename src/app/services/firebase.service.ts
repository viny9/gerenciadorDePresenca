import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLogged:any = false

  constructor(private db:AngularFirestore, public dbAuth:AngularFireAuth) { }

  getTurma() {
    return this.db.collection('/turmas').get()
  }

  addTurma(turma:any) {
    return this.db.collection('turmas').add(turma)
  }
  
  readAlunos(id:any) {
    return this.db.collection(`/turmas/${id}/alunos`).get()
  }

  addAluno(aluno:any, id:any) {
    return this.db.collection(`/turmas/${id}/alunos`).add(aluno)
  }

  removeAlunos(pathId:any, id:any) {
    return this.db.collection(`/turmas/${pathId}/alunos`).doc(id).delete()
  }

  getPresenca() {}


  addPresencaF() {}

  signin(email:any, password:any) {
    this.dbAuth.signInWithEmailAndPassword(email, password).then((res:any) => {
      this.isLogged = true
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }
  
  signup(email:any, password:any) {
    this.dbAuth.createUserWithEmailAndPassword(email, password,).then((res:any) => {
      this.isLogged = true
      localStorage.setItem('user', JSON.stringify(res.user))
      window.location.reload()
    })
  }

  logout() {
    this.dbAuth.signOut()
    localStorage.removeItem('user')
    this.isLogged = false
    window.location.reload()
  }
}
