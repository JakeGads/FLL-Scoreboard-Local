import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Team} from '../../../team'
import { TeamService } from '../team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  isValid = true;
  dataEntry = new FormGroup({
    teamNumber: new FormControl(''),
    teamName: new FormControl(''),
    scores: new FormControl('')
  });

  constructor(private teamService: TeamService) { 
    
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {

  }

  onSubmit(){
    if(this.isValid){
      if(this.dataEntry.value['scores']){
        let parsedArray : number[] = [];
        this.dataEntry.value['scores'].split(',').forEach((element:string) => {
          parsedArray.push(parseInt(element));         
        });
        this.teamService.addTeam(
          new Team(
            this.dataEntry.value['teamName'],
            this.dataEntry.value['teamNumber'],
            parsedArray
          )
        );
      }
      else{
        this.teamService.addTeam(
          new Team(
            this.dataEntry.value['teamName'],
            this.dataEntry.value['teamNumber']
          )
        )
      }
      this.dataEntry.reset();
    }
  }

  search(){
    // ! because if it finds a team it returns a string
    this.isValid = !(this.teamService.search(this.dataEntry.value['teamNumber']))
  }
}
