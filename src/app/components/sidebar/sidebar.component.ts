import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddTurmaComponent } from '../../views/add-turma/add-turma.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  turmas:any [] = []
  newTurmas:any [] = []
  search:any
  notAdmin:any

  constructor( public dialog: MatDialog, private db: FirebaseService, private dbAuth:AuthService , private router:Router) { }

  ngOnInit(): void {
    this.notAdmin = this.dbAuth.notAdmin
    this.createForm()
    
    if(sessionStorage['tipo'] == 'admin') {
      this.getTurmas()
    } else if(sessionStorage['tipo'] == 'professor') {
      this.getProfTurmas()
    }
  }

  //Vai pegar todas as turmas
  getTurmas() {
    this.db.getTurmas().subscribe((res:any) => {
      res.docs.forEach((element:any) => {
        this.turmas.push(element.data())
      });

      this.turmas = this.turmas.sort((a:any, b:any) => {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;    
      })

      //Para pesquisar depois
      this.newTurmas = this.turmas
    })
  }

  //Vai pegar as turmas do Professor
  getProfTurmas() {
    const professores:any = []
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
      for (let i = 0; i < user[0]?.turma.length; i++) {
        turmas.push({nome: user[0]?.turma[i]})
      }

      this.turmas = turmas
      
      this.turmas = this.turmas.sort((a:any, b:any) => {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;    
      })
      
      //Para pesquisar depois
      this.newTurmas = this.turmas
    } catch (error) {
     this.db.handleError(error) 
    }
    })
  }
  
  //Vai criar um form para o FormGroup
  createForm() {
    this.search = new FormGroup({
      search: new FormControl(),
    })
  }

  searchs() {
    try {
      const filtrado = this.turmas.filter((turma:any) =>{
        if(turma.nome.toLowerCase().includes(this.search.value.search) || turma.nome.toUpperCase().includes(this.search.value.search) || turma.nome.includes(this.search.value.search)) {
          return turma
        } else {}
      })
      
      if(filtrado.length === 0) {
        this.newTurmas = this.turmas
      } else {
        this.newTurmas = filtrado
      }
    } catch (error) {
      this.db.handleError(error)      
    }
  }

  openAddTurma() {
    const ref = this.dialog.open(AddTurmaComponent, {
      width: '500px'
    })

    ref.afterClosed().subscribe((infos:any) => {
      if(infos === undefined) {
        return 
      } else {
        this.addTurma(infos)
      }
    })
  }

  addTurma(turma:any) {
    this.db.addTurma(turma)
  }

  selectedTurma(nome:any) {
    this.db.getTurmas().subscribe((res:any) => {
      const ids = res.docs

      const names = res.docs.map((res:any) => {
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

  logout() {
    this.dbAuth.logOut()
  }
}
