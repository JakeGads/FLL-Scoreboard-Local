import { HttpClient } from '@angular/common/http';
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

  constructor(private data: SettingsService, private http: HttpClient) { }

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

  addTeamsAPI(){
    // TODO add the file uploading
    this.http.post('http://localhost:4201/add-teams', '')
  }

  clearTeamsAPI(){
    this.http.post('https://localhost:4201/clearTeams', '');
  }
}
