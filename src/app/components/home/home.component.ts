import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateTurmaComponent } from 'src/app/views/update-turma/update-turma.component';
import { DeleteComponent } from 'src/app/views/delete/delete.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  turmas: any[] = []
  turma:any
  id: any
  notAdmin: any

  constructor(private db: FirebaseService, public dbAuth: AuthService, private router: Router, private dialog: MatDialog) {

    this.db.titleInfos = {
      title: 'Turmas'
    }

  }

  ngOnInit(): void {
    this.notAdmin = this.dbAuth.notAdmin
  
    if(sessionStorage['tipo'] == 'professor') {
      this.getProfTurmas()
    } else if(sessionStorage['tipo'] == 'admin') {
      this.getTurmas()
    }

  }

  getTurmas() {
    this.db.getTurmas().subscribe((res:any) => {
        res.docs.forEach((element:any) => {
          this.turmas.push(element.data())
          
          this.turmas = this.turmas.sort((a: any, b: any) => {
            return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
          })
        })
    })
  }

  getTurma() {
    this.db.getTurma(this.id).subscribe((res:any) => {
      this.turma = res.data()
    })
  }

  getProfTurmas() {
    const professores = <any>[]
      this.db.getUsers().subscribe((res: any) => {

        res.docs.forEach((element: any) => {
          professores.push(element.data())
        }); 
        
    try {

      const user = professores.filter((professor: any) => {
        if (professor.id == sessionStorage['id']) {
            return professor
        }
      })

      const turmas:any = []
      for (let i = 0; i < user[0].turma.length; i++) {
        turmas.push({nome: user[0].turma[i]})
      }

      this.turmas = turmas
      
      this.turmas = this.turmas.sort((a: any, b: any) => {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
      })
      
    } catch (error) {
      this.db.handleError(error)
    }
    })
  }

  //Vai achar o id e navegar para turma escolhida
  selectedTurma(nome: any) {
    this.db.getTurmas().subscribe((res:any) => {

      const ids = res.docs
      const names = res.docs.map((res: any) => {
        return res.data().nome
      })

      try {
        const index = names.indexOf(nome)
        const id = ids[index].id
        this.router.navigate([`turma/${id}`])
        
      } catch (error) {
        this.dbAuth.openSnackbar('Turma não encontrada')
      }
    })
  }

  findId(nome: any) {
    this.db.getTurmas().subscribe((res:any) => {
      const ids = res.docs
      const names = res.docs.map((res: any) => {
        return res.data().nome
      })

      try {
        const index = names.indexOf(nome)
        this.id = ids[index].id
        this.getTurma()

      } catch (error) {
        this.dbAuth.openSnackbar('Turma não encontrada')
      }

    })
  }

  removeTurma() {
    const ref = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: 'Você deseja excluir essa turma ?'
    })

    ref.afterClosed().subscribe((res:any) => {
      if(res == true) {
        this.db.deleteTurma(this.id)
      }
   })
  }

  openUpdateTurma() {
    const ref = this.dialog.open(UpdateTurmaComponent, {
      width: '500px',
      data: this.turma
    })

    ref.afterClosed().subscribe((res: any) => {
      if(res == undefined) {
        return 
      }
      else {
        this.db.updateTurma(this.id, res)
      }
    })
  }


}
