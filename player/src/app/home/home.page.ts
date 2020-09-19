import { Component, OnInit } from '@angular/core';
import { Media } from '@ionic-native/media/ngx';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( private storageService: StorageService,  private authService: AuthService, private media: Media) { }

  ngOnInit() {
    this.check();
  }
  async check(){
    let user = await this.storageService.get(AuthConstants.USERINFO);
  }
}
