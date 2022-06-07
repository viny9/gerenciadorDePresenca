import { startWith, map } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  turmas:any = []
  filterValue:any
  input = new FormControl('', [Validators.required])

  formSignin:any
  notAdmin: any
  login:any = false
  @Output() isLogged = new EventEmitter

  constructor(private dbAuth:AuthService, private db:FirebaseService) { 
    this.filterValue = this.input.valueChanges.pipe(
      startWith(null),
      map((turma: string | null) => (turma ? this._filter(turma) : this.turmas.slice())),
    );
  }

//Adicionar um sessionStorage para o pais Responsavel para ver se melhorar deles entrar

  ngOnInit(): void {
    this.getTurmas()
    this.createForm()
  }

  getTurmas() {
    this.db.getTurmas().subscribe((res:any) => {
      res.docs.forEach((element:any) => {
        this.turmas.push(element.data().nome)
      });
    })
  }

  createForm() {
    this.formSignin = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.notAdmin = new FormGroup({
      turmas: new FormControl(),
      nome: new FormControl('', [Validators.required]),
    })
  }

  onSignin () {
    this.dbAuth.signin(this.formSignin.value.email, this.formSignin.value.password)
  }

  enter() {
    console.log(this.notAdmin)
    this.dbAuth.alunoInfos(this.notAdmin.controls['turmas'].value, this.notAdmin.value.nome)
      this.dbAuth.isLogged 
  }

  private _filter(value:any): string[] {
    const filterValue = value.toLowerCase()

    return this.turmas.filter((turma:any) => {
      turma.toLowerCase().includes(filterValue)
    })
  }
}
