import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from './../../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { JustificarFaltasComponent } from 'src/app/views/justificar-faltas/justificar-faltas.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  alunoInfos:any = []
  falta:any = []

  displayedColumns:any = ['dia', 'materia', 'horario', 'acoes']

  constructor(private ref: MatDialog, private db:FirebaseService, private dbAuth:AuthService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      this.getAluno(params)
      this.faltas(params)
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
      
      this.falta = this.falta.sort((a:any, b:any) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;    
      })
    })
  }

  openJustificarFaltas() {
   const ref = this.ref.open(JustificarFaltasComponent, {
      width: '500px'
    })

    ref.afterClosed().subscribe((infos:any) => {
      this.db
    })
  }
}
