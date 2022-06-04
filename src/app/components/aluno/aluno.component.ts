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

  constructor(private dialog: MatDialog, private db:FirebaseService, private dbAuth:AuthService, private route:ActivatedRoute) { }

//Da um revisada no código pra ver se ta funcionando 
//E implementa separado um gerador de qrCode 
//talvez a twilio
  
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      this.pathIds = params
      this.getAluno(params)
      this.faltas(params)
      this.getTurmaName(params.turmaId)
    })


    if(this.dbAuth.user == true) {
      this.normal = this.dbAuth.user
      this.displayedColumns =  ['dia', 'materia', 'horario', 'professor', 'status',]
    } else {
      this.displayedColumns = ['dia', 'materia', 'horario', 'professor', 'status', 'acoes']
    }
  }

  getTurmaName(id:any) {
    this.db.getTurma(id).subscribe((infos:any) => {
      this.db.titleInfos = {
      title: infos.data().nome
      }
   })
  }

  getAluno(pathIds:any) {
    this.db.readAluno(pathIds.turmaId, pathIds.alunoId).forEach((element:any) => {
      this.alunoInfos = [element.data()]
    })
  }

  faltas(pathsId:any) {
    const fre = <any>[]
    this.db.getPresenca(pathsId.turmaId, pathsId.alunoId).subscribe((infos:any) => {
      infos.docs.forEach((element:any) => {
        fre.push(element.data())
      });

     this.falta = fre.filter((falta:any) => {
        if(falta.presenca === 'F') {
          return falta
        }
      })

      console.log(this.falta)

      this.falta = this.falta.sort((a:any, b:any) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;    
      })
    })
  }

  findId(nome: any) {
    this.selectedFalta = nome
    this.db.getPresenca(this.pathIds.turmaId, this.pathIds.alunoId).subscribe(infos => {

      const ids = infos.docs
      const names = infos.docs.map((infos: any) => {
        return infos.data().id
      })
      
      const index = names.indexOf(nome.id)
      this.id = ids[index].id

    })
  }

  openJustificarFaltas() {
   const ref = this.dialog.open(JustificarFaltasComponent, {
      width: '500px',
      data: this.selectedFalta
    })

    ref.afterClosed().subscribe((infos?:any) => {
      if(infos == undefined) {
        return 
      } else {
        const justificado = {
          ...this.selectedFalta, 
          justificativa: infos
        }
        
        justificado.status = 'Justificado'

        console.log(justificado)

        this.db.justificarFalta(this.pathIds.turmaId, this.pathIds.alunoId, this.id, justificado)
        .then(() => { window.location.reload() })
      }
    })
  }

  openEditarFalta() {
    const ref = this.dialog.open(EditarFaltaComponent, {
      width: '500px',
      data: this.selectedFalta
    })

    ref.afterClosed().subscribe((infos:any) => {
     if(infos == undefined) {
      return 

      } else {

      const falta = {
        ...this.selectedFalta
      }
      
      falta.horario = infos.horario
      falta.materia = infos.materia
      falta.professor = infos.professor

      if(infos.justificativa != undefined) {
        falta.justificativa = infos.justificativa
        falta.status = 'Justificado'
      }

      this.db.justificarFalta(this.pathIds.turmaId, this.pathIds.alunoId, this.id, falta)
      .then(() => { window.location.reload() })
      }
    })
  }
  
  deleteFalta() {

    const ref = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: 'Ao clicar em deletar essa falta será convertida em presença'
    })

    ref.afterClosed().subscribe((infos:any) => {
      if(infos == true) {
        this.selectedFalta.presenca = 'P'
        delete this.selectedFalta.status
        delete this.selectedFalta.justificativa
        
        this.db.justificarFalta(this.pathIds.turmaId, this.pathIds.alunoId, this.id, this.selectedFalta)
        .then(() => window.location.reload() )
      }
    })
  }
}
