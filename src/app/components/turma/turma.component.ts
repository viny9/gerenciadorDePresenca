import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddAlunoComponent } from 'src/app/views/add-aluno/add-aluno.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateAlunoComponent } from 'src/app/views/update-aluno/update-aluno.component';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  alunos:any = []
  aluno:any = []
  columns:any= ['numero', 'nome', 'options']
  pathId:any
  id:any
  notAdmin:any
  
  constructor(private db:FirebaseService, private dbAuth:AuthService, private dialog: MatDialog, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((infos:any) => {
      this.pathId = infos.turmaId
      this.getAlunos(this.pathId)
      this.getTurmaName(this.pathId)
    })
  }

  getAlunos(id:any) {
    const aluno:any = []
    this.alunos = []

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

  getAluno() {
    this.db.readAluno(this.pathId, this.id).subscribe((infos:any) => {
      this.aluno = infos.data()
    })
  }

  getTurmaName(id:any) {
    this.db.getTurma(id).subscribe((infos:any) => {
      this.db.titleInfos = {
      title: infos.data().nome
      }
   })
  }

  selectedAluno(nome:any) {
    this.db.readAlunos(this.pathId).subscribe(infos => {

      const ids = infos.docs
      const names = infos.docs.map((infos:any) => {
        return infos.data().nome
      })

      const index = names.indexOf(nome)
      this.id = ids[index].id

      this.router.navigate([`turma/${this.pathId}/aluno/${this.id}`])
    })  
  }

  findId(nome:any) {
    this.db.readAlunos(this.pathId).subscribe(infos => {

      const ids = infos.docs
      const names = infos.docs.map((infos:any) => {
        return infos.data().nome
      })

      const index = names.indexOf(nome)
      this.id = ids[index].id

      this.getAluno()
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

  openUpdateAluno() {
    const ref = this.dialog.open(UpdateAlunoComponent, {
      width: '500px', 
      data: this.aluno
    })

    ref.afterClosed().subscribe((infos:any) => {
      if(infos === undefined) {
        return
      } else {
        this.db.updateAluno(this.pathId, this.id, infos).then(() => {
          window.location.reload()
        })
      }
    })

  }

  deleteAluno() {
    this.db.removeAlunos(this.pathId, this.id).then(() => {
      window.location.reload()
    })
  }
}

