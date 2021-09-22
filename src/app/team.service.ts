import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../../team';
import { SettingsService } from './settings.service';
@Injectable({
  providedIn: 'root'
})
export class TeamService{
  // TODO make this a service maybe, probably most likely
  
  teams: Team[];
  source: BehaviorSubject<Team[]>; ;
  current:Observable<Team[]>;

  constructor(private settingService: SettingsService, private http: HttpClient){    // TODO pull data from the API when configure
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

  public getTeamsFromJSON(): void{
    this.current = this.http.get<Team[]>(':4201/getTeams')
    this.teams.forEach((element: Team) => {
        element.genAverage(this.settingService.settings.Average_Top);
    })
    this.sortTeams();
  }

  public sendTeamsFromJSON(): void{
    this.http.put(`:4201/saveTeams`, {'teams': JSON.stringify(this.teams)})
  }
}