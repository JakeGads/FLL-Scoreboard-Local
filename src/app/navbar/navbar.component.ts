import { Component, OnInit } from '@angular/core';
import { routeData } from '../app.module'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  routeInfo = routeData;
  constructor() { }

  ngOnInit(): void {
  }

}
