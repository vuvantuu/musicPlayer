import { Component, OnInit } from '@angular/core';
import { Media } from '@ionic-native/media/ngx';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(  private authService: AuthService, private media: Media) { }

  ngOnInit() {
  }

}
