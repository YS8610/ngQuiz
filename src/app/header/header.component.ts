import { Component, OnInit } from '@angular/core';
import { Consts } from '../Consts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  myWebsite = Consts.LINK_WEBSITE
  bikeDiary = Consts.LINK_BIKE_DIARY

  constructor() { }

  ngOnInit(): void {
  }

}
