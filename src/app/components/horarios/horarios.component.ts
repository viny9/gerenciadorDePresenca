import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { HorariosConfigComponent } from 'src/app/views/horarios-config/horarios-config.component';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  constructor(private db:FirebaseService,private dialog:MatDialog) {
    this.db.titleInfos = {
     title: 'Horários'
   }
  }

  dataSource:any = []
  displayedColumns:any = ['position','inicio', 'fim', 'actions']
  data:any
  turmas:any
  turno:any = '1LfL4eBlssJaqX4e3Rth'

  ngOnInit(): void {
    this.horarios('1LfL4eBlssJaqX4e3Rth')
  }

  horarios(value:any) {
    this.turno = value
    const horarios:any = []
    this.db.getHorarios(value).subscribe((res:any) => {
      res.forEach((element:any) => {
        horarios.push(element.data())
        this.dataSource = horarios
      });
    })
  }

  openHorarios (id:any){ 
    setTimeout(() => {
      const ref = this.dialog.open(HorariosConfigComponent, {
        width: '500px',
        data: {
          id: id,
          turno: this.turno
        }
      })

      ref.afterClosed().subscribe((res:any) => {
        if(res == undefined) {
          return 
        } else {
          const updatedHorario = {
            id: res.id,
            horario: res.id,
            inicio: res.inicio,
            fim: res.fim
          }

          this.update(updatedHorario)
        }
      })
    }, 500);
  }

  update(horario:any) {
    this.db.updateHorarios(this.turno, horario.id, horario)
  }
}
