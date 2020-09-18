import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx'; 
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

import { Media } from '@ionic-native/media/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    HttpClientModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StreamingMedia, YoutubeVideoPlayer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
