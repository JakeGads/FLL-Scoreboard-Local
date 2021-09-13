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
    teamName: new FormControl(''),
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

  onSubmit(){
    if(this.search()){
      this.errorMsg = '';
      this.teams.addScore(
        this.dataEntry.value['teamNumber'], 
        this.dataEntry.value['score'], 
        this.settings.Average_Top
      );
      this.teamName = ''
      this.dataEntry.reset();
     
    }
    else{
      this.errorMsg = `Team Number ${this.dataEntry.value['teamNumber']} not found in existing list. Please Double Check`
    }
  }

  search(){
    this.teamName = this.teams.search(this.dataEntry.value['teamNumber'])
    this.dataEntry.value['teamName'] = this.teamName;
    if(this.dataEntry.value['teamName']){
      return true;   
    }
    return false;
  }
}

