import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamService } from '../team.service';
import { SettingsService } from '../settings.service';
import { Team } from 'team';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  
  teams!: Team[];
  private teamsSub!: Subscription;

  settings!: { Match_Timer: string; Average_Top: number; };
  private settingSub!: Subscription;

  constructor(private SettingsService: SettingsService, private teamService: TeamService) { 
    
  }

  ngOnInit(): void {
    this.settingSub = this.SettingsService.current.subscribe(message => this.settings = message);
    this.teamsSub = this.teamService.current.subscribe(message => this.teams = message)
  }
  
  ngOnDestroy(): void {
    this.settingSub.unsubscribe();
  }

}
