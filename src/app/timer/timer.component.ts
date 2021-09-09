import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  // filled her only for vscode helper functions
  private settings = {
    'Match_Timer': '02:30',
    'Average_Top': 3
  };
  private settingSub!: Subscription;

  private secondCounter = interval(1 * 1000);
  private target_time: number | undefined;

  curr_time: string;

  private loop(target_time: number){
    if(Date.now() < target_time){
      let diff = target_time - Date.now()
      let min = Math.floor(diff/1000/60);
      let second = Math.floor(diff / 1000) % 60;
      
      if(min.toString().length < 2){
        this.curr_time = `0${min}`; 
      }
      else {
        this.curr_time = min.toString() 
      }

      if(second.toString().length < 2){
        this.curr_time += `:0${second}`
      }
      else {
        this.curr_time += `:${second}`
      } 
    }
    
  }

  start(){
    this.target_time = Date.now()
    this.target_time += parseInt(this.settings.Match_Timer.split(':')[0]) * 60 * 1000; // add minutes
    this.target_time += parseInt(this.settings.Match_Timer.split(':')[1]) * 1000; // add seconds
    
    this.secondCounter.subscribe(this.loop)
  }

  constructor(private data: SettingsService) { this.curr_time = "" }
  
  ngOnInit(){
    this.settingSub = this.data.current.subscribe(message => this.settings = message);
    this.curr_time = this.settings.Match_Timer;
  }

  ngOnDestroy(){
    this.settingSub.unsubscribe();
  }

  
}
