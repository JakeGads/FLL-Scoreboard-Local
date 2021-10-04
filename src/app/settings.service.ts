import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

let Match_Timer_Options = ['02:30', '05:00', '10:00', '25:00', '60:00']
let Average_Options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let Team_Options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
let Board_Time = [5, 10, 15, 20, 25, 30]

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings = {
    'Match_Timer': '02:30',
    'Average_Top': 3,
    'Teams_To_Display': 5,
    'Board_Cycle_Time': 5
  };
  private messageSource = new BehaviorSubject(this.settings);
  current = this.messageSource.asObservable();

  public changeTime(){
    this.settings.Match_Timer = Match_Timer_Options[((Match_Timer_Options.indexOf(this.settings.Match_Timer) + 1) % Match_Timer_Options.length)];
  }

  public changeTop(){
    this.settings.Average_Top = Average_Options[((Average_Options.indexOf(this.settings.Average_Top) + 1) % Average_Options.length)]
  }

  public changeTeams(){
    this.settings.Teams_To_Display = Team_Options[((Team_Options.indexOf(this.settings.Teams_To_Display) + 1) % Team_Options.length)]
  }

  public changeTeamCycle(){
    this.settings.Board_Cycle_Time = Board_Time[((Board_Time.indexOf(this.settings.Board_Cycle_Time) + 1) % Board_Time.length)]
  }

  constructor() {}
}


/**  example usage
class Example implements OnInit, OnDestroy {
  settings = {
    'Match_Timer': '02:30',
    'Average_Top': 3
  };
  settingSub!: Subscription;

  constructor(private data: SettingsService) { }
  
  ngOnInit(){
    this.settingSub = this.data.current.subscribe(message => this.settings = message);
  }

  ngOnDestroy(){
    this.settingSub.unsubscribe();
  }
}
*/