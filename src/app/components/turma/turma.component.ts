import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AddAlunoComponent } from 'src/app/views/add-aluno/add-aluno.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateAlunoComponent } from 'src/app/views/update-aluno/update-aluno.component';
import { DeleteComponent } from 'src/app/views/delete/delete.component';

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
    this.route.params.subscribe((res:any) => {
      this.pathId = res.turmaId
      this.getAlunos(this.pathId)
      this.getTurmaName(this.pathId)
    })
  }

  getAlunos(id:any) {
    const aluno:any = []
    this.alunos = []

    this.db.readAlunos(id).subscribe((res:any) => {
      res.forEach((element:any) => {
        aluno.push(element.data())
        this.alunos = aluno
      });
      
      this.alunos = this.alunos.sort((a:any, b:any) => {
        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;    
      })
    })
  }

  getAluno() {
    this.db.readAluno(this.pathId, this.id).subscribe((res:any) => {
      this.aluno = res.data()
    })
  }

  getTurmaName(id:any) {
    this.db.getTurma(id).subscribe((res:any) => {
      this.db.titleInfos = {
      title: res.data().nome
      }
   })
  }

  selectedAluno(nome:any) {
    this.db.readAlunos(this.pathId).subscribe((res:any) => {

      const ids = res.docs
      const names = res.docs.map((res:any) => {
        return res.data().nome
      })

      try {
        const index = names.indexOf(nome)
        this.id = ids[index].id
        
        this.router.navigate([`turma/${this.pathId}/aluno/${this.id}`])
      } catch (error) {
        this.dbAuth.openSnackbar('Aluno não encontrado')
      }
    })  
  }

  findId(nome:any) {
    this.db.readAlunos(this.pathId).subscribe((res:any) => {

      const ids = res.docs
      const names = res.docs.map((res:any) => {
        return res.data().nome
      })

      try {
        const index = names.indexOf(nome)
        this.id = ids[index].id
        this.getAluno()
        
      } catch (error) {
        this.db.handleError(error)
      }
    })  
  }
 
  //Vai abrir o Dialog 
  openAddAluno() {
      const ref = this.dialog.open(AddAlunoComponent, {
        width: '500px',
      })
      
      ref.afterClosed().subscribe((res:any) => {
        if(res === undefined) {
          return
        } else {
          this.addAluno(res)
        }
      })
  }

  addAluno(aluno:any) {
    this.db.addAluno(aluno, this.pathId)
  }

  openUpdateAluno() {
    setTimeout(() => {
      const ref = this.dialog.open(UpdateAlunoComponent, {
        width: '500px', 
        data: this.aluno
      })
      
      ref.afterClosed().subscribe((res:any) => {
        if(res === undefined) {
          return
        } else {
          this.db.updateAluno(this.pathId, this.id, res)
        }
      })
    }, 500);
  }
    
  deleteAluno() {
    const ref = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: 'Você deseja remover esse aluno ?'
    })

    ref.afterClosed().subscribe((res:any) => {
      if(res == true) {
        this.db.removeAlunos(this.pathId, this.id)
      }
    })
  }
}

