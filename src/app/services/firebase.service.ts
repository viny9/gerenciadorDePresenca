import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private headInfos = new BehaviorSubject < Object > ({
    title: ''
  })
  load: any = true

  constructor(public db: AngularFirestore, private snackBar: MatSnackBar) {}

  get titleInfos() {
    return this.headInfos.value
  }

  set titleInfos(headInfos: any) {
    this.headInfos.next(headInfos)
  }

  //Turmas
  getTurmas() {
    return this.db.collection('/turmas').get()
      .pipe(catchError(e => this.handleError(e)))
  }

  getTurma(pathId: any) {
    return this.db.collection('/turmas').doc(pathId).get()
      .pipe(catchError(e => this.handleError(e)))
  }

  async addTurma(turma: any) {
    return await this.db.collection('turmas').add(turma)
      .then(() => {window.location.reload()})
      .catch(e => this.handleError(e))
  }

  async updateTurma(id: any, newTurma: any) {
    return await this.db.collection('turmas').doc(id).update(newTurma)
      .then(() => {window.location.reload()})
      .catch(e => this.handleError(e))
  }

  async deleteTurma(turma: any) {
    return await this.db.collection('/turmas').doc(turma).delete()
      .then(() => window.location.reload())
      .catch(e => this.handleError(e))
  }

  //Alunos
  readAlunos(id: any) {
    return this.db.collection(`/turmas/${id}/alunos`).get()
      .pipe(catchError(e => this.handleError(e)))
  }

  readAluno(pathId: any, id: any) {
    return this.db.collection('/turmas').doc(pathId).collection('/alunos').doc(id).get()
      .pipe(catchError(e => this.handleError(e)))
  }

  async updateAluno(pathId: any, id: any, newAluno: any) {
    return await this.db.collection('turmas').doc(pathId).collection('alunos').doc(id).update(newAluno)
      .then(() => {window.location.reload()})
      .catch(e => this.handleError(e))
  }

  async addAluno(aluno: any, id: any) {
    return await this.db.collection(`/turmas/${id}/alunos`).add(aluno)
      .then(() => {window.location.reload()})
      .catch(e => this.handleError(e))
  }

  async removeAlunos(pathId: any, id: any) {
    return await this.db.collection(`/turmas/${pathId}/alunos`).doc(id).delete()
      .then(() => {window.location.reload()})
      .catch(e => this.handleError(e))
  }

  //Presença
  getPresenca(pathId: any, id: any) {
    return this.db.collection('/turmas').doc(pathId).collection('/alunos').doc(id).collection('/presenca').get()
      .pipe(catchError(e => this.handleError(e)))
  }

  async addPresenca(pathId: any, alunoId: any, presenca: any) {
    return await this.db.collection('/turmas').doc(pathId).collection('/alunos').doc(alunoId).collection('/presenca').add(presenca)
      .catch(e => this.handleError(e))
  }

  async justificarFalta(pathId: any, alunoId: any, falta: any, presenca: any) {
    return await this.db.collection('turmas').doc(pathId).collection('alunos').doc(alunoId).collection('presenca').doc(falta).set(presenca)
      .then(() => {window.location.reload()})
      .catch(e => this.handleError(e))
  }

  //Users
  getUsers() {
    return this.db.collection('users').get()
      .pipe(catchError(e => this.handleError(e)))
  }

  getUser(id: any) {
    return this.db.collection('users').doc(id).get()
      .pipe(catchError(e => this.handleError(e)))
  }

  deleteProfTurma(id: any, turma: any) {
    this.db.collection('users').doc(id).update(turma)
      .then(() => {window.location.reload()})
      .catch((e) => this.handleError(e))
  }

  async updateUser(id: any, newUser: any) {
    return await this.db.collection('users').doc(id).update(newUser)
      .then(() => window.location.reload())
      .catch((e) => this.handleError(e))
  }

  async deleteUser(id: any) {
    return await this.db.collection('users').doc(id).delete()
      .then(() => window.location.reload())
      .catch((e) => this.handleError(e))
  }

  //Erros
  handleError(e: any) {
    this.openSnackbar('Ocorreu um erro')
    return EMPTY
  }

  openSnackbar(message: any) {
    this.snackBar.open(message, 'X', {
      duration: 1500,
      panelClass: ['snackBar'],
      verticalPosition: 'top'
    })
  }


}
