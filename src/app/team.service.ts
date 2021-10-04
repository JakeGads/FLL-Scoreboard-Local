import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../../team';
import { SettingsService } from './settings.service';
import { api_direction } from './urls';

@Injectable({
  providedIn: 'root'
})
export class TeamService{  
  teams: Team[] = [];
  subTeam: Team[] = [];
  source: BehaviorSubject<Team[]> = new BehaviorSubject(this.teams);
  current:Observable<Team[]> = this.source.asObservable();;

  constructor(private settingService: SettingsService, private http: HttpClient){    // TODO pull data from the API when configure
    this.getTeams()
  }

  async getTeams(){
    await this.http.get(api_direction + 'getTeams').subscribe(data => {
        let x : any = data;
        x.forEach((element:any) => {
            if(!element['scores'])
                this.teams.push(
                    new Team(
                        element['name'],
                        element['num']
                    )
                )
            else
                this.teams.push(
                    new Team(
                        element['name'],
                        element['num'],
                        element['scores']
                    )
                )           
        });
    });
  }
  
  public addTeam(team: Team){
    this.teams.push(team)
    this.putTeams()
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
    );
    this.sortTeams();
    this.putTeams();
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
        element.genAverage(this.settingService.settings.Average_Top);
    })
    this.sortTeams();
  }

  public async putTeams(){
    //TODO force this to write out then send
    let x: any = [];
    this.teams.forEach((element: Team) => {
        x.push(`{'name':'${element.name}','num':${element.num},'scores':[${element.scores}]}`)
    });
    
    this.http.put(api_direction +'saveTeams', {body: JSON.stringify(x)}).subscribe();
  }

  getSubSet(current: number, offset: number): Team[]{
    let deepCopy = [...this.teams]
    try{
        return deepCopy.splice(current, offset);
    } catch(err: any){
        return deepCopy.splice(current, this.teams.length - offset);
    }
  }

  getSize() {
    return this.teams.length;
  }
}