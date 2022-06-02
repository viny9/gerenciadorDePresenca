import { FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-justificar-faltas',
  templateUrl: './justificar-faltas.component.html',
  styleUrls: ['./justificar-faltas.component.css']
})
export class JustificarFaltasComponent implements OnInit {

  justificativa:any

  constructor(private ref:MatDialogRef<JustificarFaltasComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.justificativa = new FormGroup({
      justi: new FormControl('')
    })
    console.log(this.data)
  }

  close() {
    this.ref.close()
  }

  justificar() {
    this.ref.close(this.justificativa.value.justi)
  }

}
