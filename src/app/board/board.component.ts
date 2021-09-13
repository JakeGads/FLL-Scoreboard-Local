import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Teams } from '../../../team'
import { SettingsService } from '../settings.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  teams: Teams;
  settings!: { Match_Timer: string; Average_Top: number; };
  settingSub!: Subscription;

  constructor(private data: SettingsService) { 
    this.teams = new Teams()
  }

  ngOnInit(): void {
    this.settingSub = this.data.current.subscribe(message => this.settings = message);
  }
  
  ngOnDestroy(): void {
    this.settingSub.unsubscribe();
  }

}
