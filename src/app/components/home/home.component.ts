import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateTurmaComponent } from 'src/app/views/update-turma/update-turma.component';
import { parse } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  professores: any = []
  turmas: any[] = []
  professor: any
  id: any
  notAdmin: any

  constructor(private db: FirebaseService, private dbAuth: AuthService, private router: Router, private dialog: MatDialog) {
    this.db.titleInfos = {
      title: 'Turmas'
    }
  }

  ngOnInit(): void {
    this.notAdmin = this.dbAuth.admin
    this.getProfessores()

      //Vai ordenar o array
    this.turmas = this.turmas.sort((a: any, b: any) => {
      return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
    })
  }

  getProfessores() {
    this.db.getProfessores().subscribe((infos: any) => {
      infos.docs.forEach((element: any) => {
        this.professores.push(element.data())
      }); 

      const user = this.professores.filter((professor: any) => {
        if (`"${professor.uid}"` == localStorage['user']) {
          return professor
        }
      })

      this.professor = user
      const turmas:any = []

      for (let i = 0; i < this.professor[0].turma.length; i++) {
        turmas.push({nome: this.professor[0].turma[i]})
      }

      this.turmas = turmas
    })
  }

  //Vai achar o id e navegar para turma escolhida
  selectedTurma(nome: any) {
    this.db.getTurmas().subscribe(infos => {

      const ids = infos.docs
      const names = infos.docs.map((infos: any) => {
        return infos.data().nome
      })

      const index = names.indexOf(nome)
      const id = ids[index].id

      this.router.navigate([`turma/${id}`])

    })
  }

  findId(nome: any) {
    this.db.getTurmas().subscribe(infos => {

      const ids = infos.docs
      const names = infos.docs.map((infos: any) => {
        return infos.data().nome
      })

      const index = names.indexOf(nome)
      this.id = ids[index].id

    })
  }

  removeTurma() {
    this.db.deleteTurma(this.id).then(() => {
      window.location.reload()
    })
  }

  openUpdateTurma() {
    const ref = this.dialog.open(UpdateTurmaComponent, {
      width: '500px'
    })

    ref.afterClosed().subscribe((infos: any) => {
      this.db.updateTurma(this.id, infos).then(() => {
        window.location.reload()
      })
    })
  }

  log() {
    this.dbAuth.logout()
  }


}
