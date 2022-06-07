import { DeleteComponent } from 'src/app/views/delete/delete.component';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from './../../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { JustificarFaltasComponent } from 'src/app/views/justificar-faltas/justificar-faltas.component';
import { AuthService } from 'src/app/services/auth.service';
import { EditarFaltaComponent } from 'src/app/views/editar-falta/editar-falta.component';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  alunoInfos:any = []
  falta:any = []
  normal:any
  pathIds:any
  id:any
  selectedFalta:any
  justificado:any

  displayedColumns:any = []

  // elementType = 'url';
  // value = 'http://localhost:4200/turma/RGsNfdSaSFNx7JIIxAwi/aluno/YPUhtM1VdtCYARDlhDLD';

  constructor(private dialog: MatDialog, private db:FirebaseService, private dbAuth:AuthService, private route:ActivatedRoute) { }

//Da um revisada no código pra ver se ta funcionando 
//talvez a twilio
  
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      this.pathIds = params
      this.getAluno(params)
      this.faltas(params)
      this.getTurmaName(params.turmaId)
    })

    this.columns()
  }

  columns() {
    if(this.dbAuth.user == true) {
      this.normal = this.dbAuth.user
      this.displayedColumns =  ['dia', 'materia', 'horario', 'professor', 'status',]
    } else {
      this.displayedColumns = ['dia', 'materia', 'horario', 'professor', 'status', 'acoes']
    }
  }

  getTurmaName(id:any) {
    this.db.getTurma(id).subscribe((res:any) => {
      this.db.titleInfos = {
      title: res.data().nome
      }
   })
  }

  getAluno(pathIds:any) {
    this.db.readAluno(pathIds.turmaId, pathIds.alunoId).subscribe((res:any) => {
      this.alunoInfos = [res.data()]
    })
  }

  faltas(pathsId:any) {
    const fre = <any>[]
    this.db.getPresenca(pathsId.turmaId, pathsId.alunoId).subscribe((res:any) => {
      res.docs.forEach((element:any) => {
        fre.push(element.data())
      });

     this.falta = fre.filter((falta:any) => {
        if(falta.presenca === 'F') {
          return falta
        }
      })

      this.falta = this.falta.sort((a:any, b:any) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;    
      })
    })
  }

  findId(nome: any) {
    this.selectedFalta = nome
    this.db.getPresenca(this.pathIds.turmaId, this.pathIds.alunoId).subscribe(res => {
      const ids = res.docs
      const names = res.docs.map((res: any) => {
        return res.data().id
      })
      
      try {
        const index = names.indexOf(nome.id)
        this.id = ids[index].id
      } catch (error){
        this.db.handleError(error)
      }
    })
  }

  openJustificarFaltas() {
    setTimeout(() => {
      const ref = this.dialog.open(JustificarFaltasComponent, {
        width: '500px',
        data: this.selectedFalta
      })
      
      ref.afterClosed().subscribe((res?:any) => {
        if(res == undefined) {
          return 
        } else {
          const justificado = {
            ...this.selectedFalta, 
            justificativa: res
          }
          justificado.status = 'Justificado'
          
          this.db.justificarFalta(this.pathIds.turmaId, this.pathIds.alunoId, this.id, justificado)
        }
      })
    }, 500);
  }

  openEditarFalta() {
    setTimeout(() => {
      
      const ref = this.dialog.open(EditarFaltaComponent, {
        width: '500px',
        data: this.selectedFalta
      })
      
      ref.afterClosed().subscribe((res:any) => {
        if(res == undefined) {
          return 
        } else {
          
          const falta = {
            ...this.selectedFalta
          }
          
          falta.horario = res.horario
          falta.materia = res.materia
          falta.professor = res.professor
          
          if(res.justificativa != undefined) {
            falta.justificativa = res.justificativa
          }
          
          this.db.justificarFalta(this.pathIds.turmaId, this.pathIds.alunoId, this.id, falta)
        }
      })
    }, 500);
  }
  
  deleteFalta() {
    const ref = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: 'Ao clicar em deletar essa falta será convertida em presença'
    })

    ref.afterClosed().subscribe((res:any) => {
      if(res == true) {
        this.selectedFalta.presenca = 'P'
        delete this.selectedFalta.status
        delete this.selectedFalta.justificativa
        
        this.db.justificarFalta(this.pathIds.turmaId, this.pathIds.alunoId, this.id, this.selectedFalta)
      }
    })
  }
}
