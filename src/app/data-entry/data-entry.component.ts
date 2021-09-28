import { Component, OnDestroy, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SettingsService } from '../settings.service';
import {Team} from '../../../team'
import { TeamService } from '../team.service';


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
  
  private teamSub!: Subscription;
  private teams!: Team[];

  constructor(private data: SettingsService, private teamService: TeamService) { 
  }

  ngOnInit(): void {
    this.settingSub = this.data.current.subscribe(message => this.settings = message);
    this.teamSub = this.teamService.current.subscribe(message => this.teams = message)
    this.teamService.getTeamsFromJSON();
  }

  ngOnDestroy(): void {
    this.settingSub.unsubscribe();
  }

  onSubmit(){
    
    if(this.search()){
      this.errorMsg = '';
      this.teamService.addScore(
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
    this.teamName = this.teamService.search(this.dataEntry.value['teamNumber'])
    this.dataEntry.value['teamName'] = this.teamName;
    if(this.dataEntry.value['teamName']){
      return true;   
    }
    return false;
  }
}

