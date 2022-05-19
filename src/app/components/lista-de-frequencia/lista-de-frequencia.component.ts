import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-de-frequencia',
  templateUrl: './lista-de-frequencia.component.html',
  styleUrls: ['./lista-de-frequencia.component.css']
})
export class ListaDeFrequenciaComponent implements OnInit {

  alunos = [ {nome: 'vinicius Oliveira de Carvalho', numero: 1}, {nome: 'vinicius', numero: 1}]
  displayedColumns = ['numeroDoAluno', 'nomes', '1', '2', '3', '4', '5', '6'] 
  // horario:any

  constructor() { }

  ngOnInit(): void {
    // this.horarios()
  }

  // horarios() {
  //   const date = new Date()
  //   const hour = date.getHours()
  //   this.horario = hour
  // }

}
