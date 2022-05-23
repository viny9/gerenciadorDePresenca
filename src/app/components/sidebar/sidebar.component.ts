import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddTurmaComponent } from '../../views/add-turma/add-turma.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  turmas:any [] = []
  newTurmas:any [] = []
  search:any

  constructor( public dialog: MatDialog, private db: FirebaseService, private router:Router) { }

  ngOnInit(): void {
    this.createForm()

    this.db.getTurma().subscribe((infos:any) => {
      infos.docs.forEach((element:any) => {
        this.turmas.push(element.data())
        this.newTurmas = this.turmas
      });

      this.turmas = this.turmas.sort((a:any, b:any) => {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;    
      })
    })
  }

  //Vai criar um form para o FormGroup
  createForm() {
    this.search = new FormGroup({
      search: new FormControl()
    })
  }

  searchs() {
      const filtrado = this.turmas.filter((turma:any) =>{
        if(turma.nome.includes(this.search.value.search)) {
          return turma
        } else {}
      })

      if(filtrado.length === 0) {
        this.newTurmas = this.turmas
      } else {
        this.newTurmas = filtrado
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
    this.db.addTurma(turma).then(() => {
      window.location.reload()
    })
  }

  selectedTurma(nome:any) {
    this.db.getTurma().subscribe(infos => {
      const ids = infos.docs

      const names = infos.docs.map((infos:any) => {
        return infos.data().nome
      })

      const index = names.indexOf(nome)
      const id = ids[index].id

      this.router.navigate([`turma/${id}`])

    })  
  }
}
