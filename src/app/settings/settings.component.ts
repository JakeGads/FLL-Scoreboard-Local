import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  
  settingSub!: Subscription;
  settings!: { Match_Timer: string; Average_Top: number; };

  constructor(private data: SettingsService) { }

  ngOnInit(): void {
    this.settingSub = this.data.current.subscribe(message => this.settings = message);
  }

  ngOnDestroy(): void {
    this.settingSub.unsubscribe();
  }

  changeMatch_Timer(){
    this.data.changeTime();
  }

  changeAverage_Top(){
    this.data.changeTop();
  }
}
