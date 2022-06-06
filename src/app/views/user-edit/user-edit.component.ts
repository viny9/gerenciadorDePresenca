import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { startWith, map, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  turmas:any
  userType:any
  form:any
  autoComplete:any = []

  separatorKeysCodes: number[] = [ENTER, COMMA]
  addTurmas:any = []
  filterValue: Observable<string[]>;
  input = new FormControl()


  constructor(private ref:MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private db:FirebaseService) { 
      this.filterValue = this.input.valueChanges.pipe(
        startWith(null),
        map((turma: string | null) => (turma ? this._filter(turma) : this.data.turma.slice())),
      );
    }

  ngOnInit(): void {
    this.userType = this.data.type
    this.createForm()
    this.getTurmas()
  }

  createForm() {
    this.form = new FormGroup({
      nome: new FormControl(),
      turma: new FormControl()
    })

    this.form.controls['nome'].setValue(this.data.nome)

    if(this.data.type == 'professor') {
      for (let i = 0; i < this.data.turma.length; i++) {
        this.addTurmas.push(this.data.turma[i])
    }
    }
  }

  getTurmas() {
    this.db.getTurmas().subscribe((infos:any) => {
      infos.docs.forEach((element:any) => {
        this.autoComplete.push(element.data())
      });
    })
  }

  selected(event:MatAutocompleteSelectedEvent) {
    const input = this.form.controls.turma
    this.addTurmas.push(event.option.viewValue)
    // this.teste.nativeElement.value = ''

    input.setValue(null)
  }

  add(event:MatChipInputEvent) {
    const input = this.form.controls.turma
    const value = (event.value || '').trim()

    if(value) {
      this.addTurmas.push(value)
    }

    event.chipInput!.clear()
    input.setValue(null)
  }

  removedTurmas(turma:any) {
    const index = this.addTurmas.indexOf(turma)

    if(index >= 0) {
      this.addTurmas.splice(index, 1)
    }
  }

  private _filter(value:any): string[] {
    const filterValue = value.toLowerCase()

    return this.turmas.filter((turma:any) => {
      turma.toLowerCase().includes(filterValue)
    })
  }

  typeOfUser(values:any) {
    this.userType = values.value
  }

  close() {
    this.ref.close()
  }

  edit() {
    const teste = {
      ...this.form.value,
      type: this.userType
    }
    teste.turma = this.addTurmas

    this.ref.close(teste)
  }
}
