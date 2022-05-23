import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db:AngularFirestore) { }

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

  addProfessor() {}

  addPresencaF() {}
}
