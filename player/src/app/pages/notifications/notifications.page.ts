import { Component, OnInit } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { AuthService } from './../../services/auth.service';
import { HttpService } from './../../services/http.service'; 

export interface Track{
  name: string;
  idYoutube: string;
  image: string;
}
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  postData = {};
  playlist: Track [] = [];
  base_url: string = 'http://127.0.0.1:8000/public/upload/'
  constructor(
    private httpService: HttpService, private youtube: YoutubeVideoPlayer, 
    private authService: AuthService) { }

    ngOnInit(){
    this.httpService.post('Dfjnskenbhd', this.postData).subscribe(
      (res: any) => {
        console.log("result", res)
        if (parseInt(res.result.code) == 0)  {
          // Storing the User data.
          for (let item of res.result.data){
            this.playlist.push({name : item.name, idYoutube: item.idYoutube, image: this.base_url + item.image})
          }
          
          console.log("playlist", this.playlist)
        } else {
          console.log(JSON.stringify(res))
        }
        
      },
      (error: any) => {
        console.log(JSON.stringify(error))
      }
    );
  }
  
  startVideo(track: Track){
    this.youtube.openVideo(track.idYoutube);
  }
}
