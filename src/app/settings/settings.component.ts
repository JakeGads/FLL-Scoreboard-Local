import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../settings.service';
import { TeamService } from '../team.service';
import { api_direction } from '../urls';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  
  clearStage = 0;
  clearText = ['clear teams', 'this cannot be undone are you sure']

  settingSub!: Subscription;
  settings!: { Match_Timer: string; Average_Top: number; };

  constructor(private data: SettingsService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.settingSub = this.data.current.subscribe(message => this.settings = message);
  }

  ngOnDestroy(): void {
    this.settingSub.unsubscribe();
  }

  changeMatch_Timer(){
    this.data.changeTime();
  }

  changeAverage_Top(){
    this.data.changeTop();
  }

  changeClearStage(){
    this.clearStage += 1;

    if(this.clearStage >= this.clearText.length){
      fetch(api_direction + 'clearTeams')
      this.teamService.getTeams()
      this.clearStage = 0;
    }
  }

  uploadFile(files: any){
    console.log(files);
  }
}
