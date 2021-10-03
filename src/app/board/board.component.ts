import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, of, Subscription } from 'rxjs';
import { TeamService } from '../team.service';
import { SettingsService } from '../settings.service';
import { Team } from 'team';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  private first = true;
  offset = 0;
  teams!: Team[];
  subTeams:Team[] = [];
  private teamsSub!: Subscription;

  settings!: { Match_Timer: string; Average_Top: number; };
  private settingSub!: Subscription;

  private subsetSub!: Subscription;

  constructor(private SettingsService: SettingsService, private teamService: TeamService) { 
    
  }

  ngOnInit(): void {
    this.settingSub = this.SettingsService.current.subscribe(message => this.settings = message);
    this.teamsSub = this.teamService.current.subscribe(message => this.teams = message)
    this.updateSubset()
  }
  
  ngOnDestroy(): void {
    this.settingSub.unsubscribe();
    this.teamsSub.unsubscribe();
  }

  updateSubset(){
    console.log(this.teamService.getSize())
    // if(this.teamService.getSize() < this.offset){
    //   this.subTeams = this.teamService.getSubSet(this.offset, this.offset + 5)
    //   this.offset += 5;
    // } else{
    //   this.offset = 0;
    //   this.updateSubset();
    // }
  }

}

