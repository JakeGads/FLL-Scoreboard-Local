import { analyzeAndValidateNgModules } from '@angular/compiler';
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
  settings = {
    'Match_Timer': '02:30',
    'Average_Top': 3
  };
  private settingSub!: Subscription;

  isActive: boolean = false;
  private targetTime: number = 0;
  

  curr_time: string;
  private loop_object: any;


  private loop(data:TimerComponent){
    if(Date.now() < data.targetTime){
      let diff = data.targetTime - Date.now()
      let min = Math.floor(diff/1000/60);
      let second = Math.floor(diff / 1000) % 60;
      
      if(min.toString().length < 2){
        data.curr_time = `0${min}`; 
      }
      else {
        data.curr_time = min.toString() 
      }

      if(second.toString().length < 2){
        data.curr_time += `:0${second}`
      }
      else {
          data.curr_time += `:${second}`
      } 
    }
    
    if(data.curr_time == '00:00'){
      setTimeout(() => {
        data.end();
      }, 1000);
      // this.end();
    }
  }

  start(){
    
    this.isActive = true;
    this.targetTime = parseInt(this.settings.Match_Timer.split(':')[0]) * 60 * 1000; // add minutes
    this.targetTime += parseInt(this.settings.Match_Timer.split(':')[1]) * 1000; // add seconds
    this.targetTime += Date.now()
    
    this.loop_object = setInterval(this.loop, 1 * 1000, this)
  }

  end(){
    clearInterval(this.loop_object)
    this.isActive = false;
    this.curr_time = this.settings.Match_Timer;
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
