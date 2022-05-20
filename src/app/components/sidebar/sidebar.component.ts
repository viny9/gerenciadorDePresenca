import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddTurmaComponent } from '../../views/add-turma/add-turma.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  turmas:any [] = []
  newTurmas:any [] = []
  search:any

  constructor( public dialog: MatDialog, private db: FirebaseService) {
   }

   ngOnInit(): void {
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

  searchs() {
      const filtrado = this.turmas.filter((turma:any) =>{
        if(turma.nome.includes(this.search)) {
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
  }
}
