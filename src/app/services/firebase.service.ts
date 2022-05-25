import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


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

  readAluno(pathId:any, id:any) {
    return this.db.collection('/turmas').doc(pathId).collection('/alunos').doc(id).get()
  }

  addAluno(aluno:any, id:any) {
    return this.db.collection(`/turmas/${id}/alunos`).add(aluno)
  }

  removeAlunos(pathId:any, id:any) {
    return this.db
      .collection(`/turmas/${pathId}/alunos`).doc(id).delete()
  }

  getPresenca(pathId:any, id:any) {
    return this.db.collection('/turmas').doc(pathId).collection('/alunos').doc(id).collection('/presenca').get()
  }

  addPresenca(pathId:any, alunoId:any, presenca:any) {
    return this.db.collection('/turmas').doc(pathId).collection('/alunos').doc(alunoId).collection('/presenca').add(presenca)  }
}
