import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit() {
    this.check()
  }
async check(){
  let user = await this.storageService.get(AuthConstants.USERINFO);
}
}
