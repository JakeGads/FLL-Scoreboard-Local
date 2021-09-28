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
  
  teams: Team[] = [];
  source: BehaviorSubject<Team[]> = new BehaviorSubject(this.teams);
  current:Observable<Team[]> = this.source.asObservable();;

  constructor(private settingService: SettingsService, private http: HttpClient){    // TODO pull data from the API when configure
    this.current = this.http.get<Team[]>('http://localhost:4201/getTeams')
    this.current.subscribe(message => this.teams = message)
    for(let i = 0; i < this.teams.length; i++){
        this.teams[i] = new Team(this.teams[i].name, this.teams[i].num, this.teams[i].scores);
        console.log(this.teams[i])
    }
    console.log(`TEAMS: ${this.teams}`)
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
    console.log(Team)
    console.log(this.teams)
    this.teams.forEach(
        function(a:Team){
            if(a.num == teamNumber){
                a.addScore(score, top);
                return;
            }
        }
    )
    this.sortTeams();
    this.sendTeamsFromJSON();
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
    this.teams.forEach((element: Team) => {
        console.log(`NUM: ${element.name}\n`)
        element.genAverage(this.settingService.settings.Average_Top);
    })
    this.sortTeams();
  }

  public sendTeamsFromJSON(): void{
    //TODO force this to write out then send
    let x: JSON[] = [];
    this.teams.forEach((element: Team) => {
        x.push(JSON.parse(`{"name":${element.name},"num":${element.num},"scores":${element.scores},"orderedScores":${element.orderedScores},"avg":${element.avg}}`))
    });
    this.http.put(`http://localhost:4201/saveTeams`, {'teams': JSON.stringify(x)})
  }
}