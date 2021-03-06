import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { SettingsComponent } from './settings/settings.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { BoardComponent } from './board/board.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

class Temp{
  constructor(public path: string, public text: string) {}
}

export const routeData:Temp[] = [
  new Temp('/', 'Home'),
  new Temp('/board', 'Board'),
  new Temp('/admin', 'Admin'),
  new Temp('/settings', 'Settings')
]

let routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'board', component: BoardPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'settings', component: SettingPageComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    SettingsComponent,
    DataEntryComponent,
    BoardComponent,
    NavbarComponent,
    BoardPageComponent,
    AdminPageComponent,
    SettingPageComponent,
    HomePageComponent,
    AddTeamComponent,
    FileUploadComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
