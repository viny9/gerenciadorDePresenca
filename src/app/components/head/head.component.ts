import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  @Output() sidebar = new EventEmitter
  @Input() sidebarStatus:any

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  sidebarToggle() {
    this.sidebar.emit(!this.sidebarStatus)
  }

}
