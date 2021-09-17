import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../../team';
@Injectable({
  providedIn: 'root'
})
export class TeamService{
  // TODO make this a service maybe, probably most likely
  
  teams: Team[];
  source: BehaviorSubject<Team[]>; ;
  current:Observable<Team[]>;

  constructor(){
    // TODO pull data from the API when configure
    this.teams = [
        new Team('Cyber Crusaders', 272),
        new Team('Vulcan', 1260)
    ];
    this.source = new BehaviorSubject(this.teams);
    this.current = this.source.asObservable();

  }
  
  private sortTeams() {
      this.teams = this.teams.sort(
          function(a: Team, b: Team){
              if(a.avg == b.avg){
                  if(a.orderedScores[0] == b.orderedScores[0]){
                      return b.num - a.num
                  }
                  return b.orderedScores[0] - a.orderedScores[0]
              }   
              return b.avg - a.avg;  
          }
      )
  }

  public addScore(teamNumber: number, score: number, top: number = 0){
      this.teams.forEach(
          function(a:Team){
              if(a.num == teamNumber){
                  a.addScore(score, top);
                  return;
              }
          }
      )
      this.sortTeams();
  }

  public search(teamNum: number): string{
      for(let i = 0; i < this.teams.length; i++){
          if(teamNum == this.teams[i].num){
              return this.teams[i].name;
          }
      }
      return '';
  }
}