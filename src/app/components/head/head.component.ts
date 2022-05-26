import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  @Output() sidebar = new EventEmitter
  @Input() sidebarStatus:any
  show:any

  constructor(private db:FirebaseService, private dbAuth:AuthService) { }

  ngOnInit(): void {
    this.show = this.dbAuth.admin
  }

  get title() {
    return this.db.titleInfos.title
  }


  sidebarToggle() {
    this.sidebar.emit(!this.sidebarStatus)
  }

}
