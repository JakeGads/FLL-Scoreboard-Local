import { Component, OnInit } from '@angular/core';
import { Teams } from '../../../team'
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  teams: Teams;
  constructor() { 
    this.teams = new Teams()
  }

  ngOnInit(): void {
  }

}
