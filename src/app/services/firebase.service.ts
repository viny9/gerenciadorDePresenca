import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private headInfos = new BehaviorSubject<Object>({
    title: ''
  })

  load:any = true

  constructor(public db:AngularFirestore) { }

  get titleInfos() {
    return this.headInfos.value
  }

  set titleInfos(headInfos:any) {
    this.headInfos.next(headInfos)
  }

  getTurmas() {
    return this.db.collection('/turmas').get()
  }

  getTurma(pathId:any) {
    return this.db.collection('/turmas').doc(pathId).get()
  }

  addTurma(turma:any) {
    return this.db.collection('turmas').add(turma)
  }
  
  updateTurma(id:any, newTurma:any) {
    return this.db.collection('turmas').doc(id).update(newTurma)
  }
  
  deleteTurma(turma:any) {
    return this.db.collection('/turmas').doc(turma).delete()
  }
  
  readAlunos(id:any) {
    return this.db.collection(`/turmas/${id}/alunos`).get()
  }

  readAluno(pathId:any, id:any) {
    return this.db.collection('/turmas').doc(pathId).collection('/alunos').doc(id).get()
  }

  updateAluno(pathId:any, id:any, newAluno:any) {
    return this.db.collection('turmas').doc(pathId).collection('alunos').doc(id).update(newAluno)
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
    return this.db.collection('/turmas').doc(pathId).collection('/alunos').doc(alunoId).collection('/presenca').add(presenca)  
  }

  getProfessores() {
    return this.db.collection('professores').get()
  }

  getProfessor() {
    return this.db.collection('professores').doc().get()
  }

  updateProfessor() {
    return this.db.collection('professores').doc()
  }

  getUsers() {
    return this.db.collection('users').get()
  }

  justificarFalta(pathId:any, alunoId:any, falta:any, presenca:any) {
    return this.db.collection('turmas').doc(pathId).collection('alunos').doc(alunoId).collection('/presenca').doc(falta).set(presenca)
  }
}

