import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HorariosComponent } from './../../components/horarios/horarios.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-horarios-config',
  templateUrl: './horarios-config.component.html',
  styleUrls: ['./horarios-config.component.css']
})
export class HorariosConfigComponent implements OnInit {

  form = new FormGroup({
    inicio: new FormControl(),
    fim: new FormControl()
  })
  horario:any = []

  constructor(private db:FirebaseService, private ref:MatDialogRef<HorariosComponent>,
    @Inject( MAT_DIALOG_DATA) private turno:any) { }

  ngOnInit(): void {
    this.db.getHorario(this.turno.turno, this.turno.id).subscribe((res:any) => {
      this.horario = res.data()
      this.createForm()
    })
  }

  createForm() {
    this.form = new FormGroup({
      inicio: new FormControl('', [Validators.required, Validators.minLength(5)]),
      fim: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  
    this.form.controls['inicio'].setValue(this.horario.inicio)
    this.form.controls['fim'].setValue(this.horario.fim)
  }

  close() {
    this.ref.close()
  }

  update() {
    const horario = {
     inicio: this.form.value.inicio,
     fim: this.form.value.fim,
     id: this.turno.id
    }

    this.ref.close(horario)
  }

}
