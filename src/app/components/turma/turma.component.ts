import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddAlunoComponent } from 'src/app/views/add-aluno/add-aluno.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  alunos:any = []
  columns = ['numero', 'nome', 'options']
  pathId:any
  id:any
  
  constructor(private db:FirebaseService, private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((infos:any) => {
      this.pathId = infos.turmaId
      this.getAlunos(infos.turmaId)
    })
  }

  getAlunos(id:any) {
    const aluno:any = []

    this.db.readAlunos(id).subscribe((infos:any) => {
      infos.forEach((element:any) => {
        aluno.push(element.data())
        this.alunos = aluno
      });
      
      this.alunos = this.alunos.sort((a:any, b:any) => {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;    
      })
    })
  }

  findAlunoId(nome:any) {
    this.db.readAlunos(this.pathId).subscribe(infos => {

      const ids = infos.docs
      const names = infos.docs.map((infos:any) => {
        return infos.data().nome
      })

      const index = names.indexOf(nome)
      this.id = ids[index].id

    })  
  }
 
  //Vai abrir o Dialog 
  openAddAluno() {
    const ref = this.dialog.open(AddAlunoComponent, {
      width: '500px',
    })

    ref.afterClosed().subscribe((infos:any) => {
      if(infos === undefined) {
        return
      } else {
        this.addAluno(infos)
      }
    })
  }

  addAluno(aluno:any) {
    this.db.addAluno(aluno, this.pathId).then(() => {
      window.location.reload()
    })
  }

  deleteAluno() {
    this.db.removeAlunos(this.pathId, this.id).then(() => {
      window.location.reload()
    })
  }
}

