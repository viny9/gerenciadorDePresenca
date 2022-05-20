import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  turmas:any  [] = []

  constructor(private db: FirebaseService ) { }

  ngOnInit(): void {
      this.db.getTurma().subscribe((infos:any) => {
        infos.docs.forEach((element:any) => {
          this.turmas.push(element.data())
        });
        this.turmas = this.turmas.sort((a:any, b:any) => {
          return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;    
        })
      })
    }
}
