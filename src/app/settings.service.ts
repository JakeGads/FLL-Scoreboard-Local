import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings = {
    'Match_Timer': '02:30',
    'Average_Top': 3
  };
  private messageSource = new BehaviorSubject(this.settings);
  current = this.messageSource.asObservable();

  public changeTime(){
    this.settings.Match_Timer = Match_Timer_Options[((Match_Timer_Options.indexOf(this.settings.Match_Timer) + 1) % Match_Timer_Options.length)];
  }

  public changeTop(){
    this.settings.Average_Top = Average_Options[((Average_Options.indexOf(this.settings.Average_Top) + 1) % Average_Options.length)]
  }

  constructor() { }
}

let Match_Timer_Options = ['02:30', '05:00', '10:00', '25:00', '60:00']
let Average_Options = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

