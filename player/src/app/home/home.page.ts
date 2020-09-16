import { Component, OnInit } from '@angular/core';
import { Media } from '@ionic-native/media/ngx';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( private media: Media) { }

  ngOnInit() {
  }

}
