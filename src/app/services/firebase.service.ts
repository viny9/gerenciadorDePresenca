import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private headInfos = new BehaviorSubject<Object>({
    title: ''
  })

  load:any = true

  constructor(public db:AngularFirestore, private snackBar:MatSnackBar) { }

  get titleInfos() {
    return this.headInfos.value
  }

  set titleInfos(headInfos:any) {
    this.headInfos.next(headInfos)
  }

  getTurmas() {
    return this.db.collection('/turmas').get()
    .pipe(
      catchError(e => this.handleError(e))
    )
  }

  getTurma(pathId:any) {
    return this.db.collection('/turmas').doc(pathId).get()
    .pipe(
      catchError(e => this.handleError(e))
    )
  }

 async addTurma(turma:any) {
    return this.db.collection('turmas').add(turma)
    .catch(e => this.handleError(e))
  }
  
  async updateTurma(id:any, newTurma:any) {
    return this.db.collection('turmas').doc(id).update(newTurma)
    .catch(e => this.handleError(e))
  }
  
  async deleteTurma(turma:any) {
    return this.db.collection('/turmas').doc(turma).delete()
    .catch(e => this.handleError(e))
  }
  
  readAlunos(id:any) {
    return this.db.collection(`/turmas/${id}/alunos`).get()
    .pipe(
      catchError(e => this.handleError(e))
    )
  }

  readAluno(pathId:any, id:any) {
    return this.db.collection('/turmas').doc(pathId).collection('/alunos').doc(id).get()
    .pipe(
      catchError(e => this.handleError(e))
    )
  }

  async updateAluno(pathId:any, id:any, newAluno:any) {
    return this.db.collection('turmas').doc(pathId).collection('alunos').doc(id).update(newAluno)
    .catch(e => this.handleError(e))

  }

  async addAluno(aluno:any, id:any) {
    return this.db.collection(`/turmas/${id}/alunos`).add(aluno)
    .catch(e => this.handleError(e))
  }

  async removeAlunos(pathId:any, id:any) {
    return this.db.collection(`/turmas/${pathId}/alunos`).doc(id).delete()
    .catch(e => this.handleError(e))
  }

  getPresenca(pathId:any, id:any) {
    return this.db.collection('/turmas').doc(pathId).collection('/alunos').doc(id).collection('/presenca').get()
    .pipe(
      catchError(e => this.handleError(e))
    )
  }
 
  async addPresenca(pathId:any, alunoId:any, presenca:any) {
    return this.db.collection('/turmas').doc(pathId).collection('/alunos').doc(alunoId).collection('/presenca').add(presenca)  
    .catch(e => this.handleError(e))
  }

  getUsers() {
    return this.db.collection('users').get()
    .pipe(
      catchError(e => this.handleError(e))
    )
  }
  
  getUser(id:any) {
    return this.db.collection('users').doc(id).get()
    .pipe(
      catchError(e => this.handleError(e))
    )
  }

  async updateUser(id:any, newUser:any) {
    return this.db.collection('users').doc(id).update(newUser)
    .then(() => window.location.reload())
    .catch((e) => this.handleError(e))
  }

  async justificarFalta(pathId:any, alunoId:any, falta:any, presenca:any) {
    return this.db.collection('turmas').doc(pathId).collection('alunos').doc(alunoId).collection('/presenca').doc(falta).set(presenca)
    .catch(e => this.handleError(e))
  }

  handleError(e:any) {
    this.openSnackbar('ocorre um error')
    return EMPTY
  }
  
  openSnackbar(message: any) {
    this.snackBar.open(message, 'X', {
      duration: 1500,
      panelClass: 'snackbar',
      verticalPosition: 'top'
    })
  }

}

