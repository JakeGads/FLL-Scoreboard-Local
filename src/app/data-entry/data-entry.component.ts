import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SettingsService } from '../settings.service';
import {Team, Teams} from '../../../team'


@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})
export class DataEntryComponent implements OnInit, OnDestroy {
  
  errorMsg = ''
  teamName = ''
  dataEntry = new FormGroup({
    teamNumber: new FormControl(''),
    score: new FormControl('')
  });

  private settingSub!: Subscription;
  private settings!: { Match_Timer: string; Average_Top: number; };
  
  teams: Teams;

  constructor(private data: SettingsService) { 
    this.teams = new Teams();
  }

  ngOnInit(): void {
    this.settingSub = this.data.current.subscribe(message => this.settings = message);
  }

  ngOnDestroy(): void {
    this.settingSub.unsubscribe();
  }

  onSubmit(teamNum:number, score: number){
    if(this.teams.search(teamNum)){
      this.teams.addScore(teamNum, score, this.settings.Average_Top);
    }
    else{
      this.errorMsg = `Team Number ${teamNum} not found in existing list`
    }
  }

  onChange(teamNum: number){
    this.teamName = this.teams.search(teamNum);
  }
}

