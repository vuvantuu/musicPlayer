  import { HttpDownloadProgressEvent } from '@angular/common/http';
  import { hostViewClassName } from '@angular/compiler';
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { IonRange } from '@ionic/angular';
  import {Howl, Howler} from 'howler';

  export interface Track{
    name: string;
    path: string;
  }
  @Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
  })
  export class MenuPage implements OnInit {

    playlist: Track [] = [
      {
        name : 'a song num 1',
        path: './assets/mp3/bensound-acousticbreeze.mp3'
      },
      {
        name : 'a song num 2',
        path: './assets/mp3/bensound-betterdays.mp3'
      },
      {
        name : 'a song num 3',
        path: './assets/mp3/bensound-ukulele.mp3'
      }

    ];

    activeTrack: Track = null;
    player: Howl  = null;
    isPlaying = false;
    progress = 0;
    sound = new Howl({
      src: ['http://vnso-zn-16-tf-mp3-s1-zmp3.zadn.vn/07a3ad077d43941dcd52/3122530888372189182?authen=exp=1600336177~acl=/07a3ad077d43941dcd52/*~hmac=d4ae22fc7d18c9ae65a142cd16a8b437'],
      format: ['mp3'],
      autoplay: false,
      loop: false,
      volume: 0.5,
    });
    @ViewChild('range', {static: false}) range: IonRange;

    constructor() { }

    start(track: Track){
      if(this.player){
        this.player.stop();
      }
      this.player = new Howl ({
        src: [track.path],
        onplay:　() => {
          console.log('onplay');
          this.isPlaying = true;
          this.activeTrack = track;
          this.updateProgress();
        },
        onend: () => {
          console.log('onpend');
        }
      });

      this.player.play();
    } 

    
    togglePlayer(pause){
          this.isPlaying = !pause;
        if(pause){
          this.player.pause();
        }else {
          this.player.play();
        }
    }

    next(){
      let index = this.playlist.indexOf(this.activeTrack);
      if(index != this.playlist.length -1){
        this.start(this.playlist[index + 1]);
      }else{
        this.start(this.playlist[0]);
      }
    }

    prev(){
      let index = this.playlist.indexOf(this.activeTrack);
      if(index >0){
        this.start(this.playlist[index - 1]);
      }else{
        this.start(this.playlist[this.playlist.length -1]);
      }
    }

    seek(){
      let newValue = +this.range.value;
      let duration = this.player.duration();
      this.player.seek(duration * (newValue / 100))
    }
  
    updateProgress(){
      let seek = this.player.seek();
      this.progress = (seek/ this.player.duration()) * 100 || 0;
      setTimeout(()=>{
        this.updateProgress();
      },1000)
    }







    ngOnInit() {
    }

    
  }
