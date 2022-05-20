import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db:AngularFirestore) { }

  getTurma() {
    return this.db.collection('turmas').get()
  }

  addTurma(turma:any) {
    return this.db.collection('turmas').add(turma)
  }
  
  getAlunos() {
    return this.db.collection('/turmas/XjvDDh7fH5YtpLfGusA7/alunos').get()
  }

  getPresenca() {}

  addProfessor() {}

  addAluno() {}


  addPresencaF() {}
}
