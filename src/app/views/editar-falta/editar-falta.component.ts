import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { JustificarFaltasComponent } from '../justificar-faltas/justificar-faltas.component';

@Component({
  selector: 'app-editar-falta',
  templateUrl: './editar-falta.component.html',
  styleUrls: ['./editar-falta.component.css']
})
export class EditarFaltaComponent implements OnInit {

  form:any
  justificativa:any = false
  
  constructor(private ref:MatDialogRef<JustificarFaltasComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { }
    
    ngOnInit(): void {
      this.createForm()
    }
    
    createForm() {
      this.form = new FormGroup({
      horario: new FormControl('', [Validators.required]),
      materia: new FormControl('', [Validators.required]),
      professor: new FormControl('', [Validators.required]),
    })

    this.setFormValue()
    }

    setFormValue() {
      if(this.data.justificativa != undefined) {
        
        this.form.controls.justi = new FormControl('', [Validators.required])
        this.form.controls['justi'].setValue(this.data.justificativa)
        this.justificativa = true

      } else if(this.data.justificativa != undefined) {

        this.justificativa = false
      }
        
        this.form.controls['horario'].setValue(this.data.horario)
        this.form.controls['materia'].setValue(this.data.materia)
        this.form.controls['professor'].setValue(this.data.professor)
    }

    close() {
      this.ref.close()
    }

    editar() {
    const falta:any = {
      materia: this.form.controls['materia'].value,
      horario: this.form.controls['horario'].value,
      professor: this.form.controls['professor'].value
    }

    if(this.data.justificativa != undefined) {
      falta.justificativa = this.form.controls['justi'].value
    }
    
    this.ref.close(falta)

    }

}
