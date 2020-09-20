  import { Component, OnInit } from '@angular/core';
  import { AuthService } from './../../services/auth.service';
  import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
  import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
  import { File, FileEntry } from '@ionic-native/File/ngx';
  import { Storage } from '@ionic/storage';
  import { FilePath } from '@ionic-native/file-path/ngx';
  import { HttpService } from './../../services/http.service'; 
  import { finalize } from 'rxjs/operators';
  import { StorageService } from 'src/app/services/storage.service';
  import { AuthConstants } from 'src/app/config/auth-constants';

  const STORAGE_KEY = 'my_images';

  @Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss']
  })

  export class SettingsPage implements OnInit {
    image:string ="" ;
    name: string = "";
    email: string = "";
    myPhoto:any = "";
    base_url: string = 'http://127.0.0.1:8000/public/upload/'
    postData = {
      token: ""
    };
    constructor(private httpService: HttpService,private authService: AuthService, private camera: Camera, private file: File, 
      private actionSheetController: ActionSheetController, private toastController: ToastController,private storageService: StorageService,
      private storage: Storage, private plt: Platform, private loadingController: LoadingController, private filePath: FilePath) {}
    
    ngOnInit() {
      this.getinfo();
      
    }
  async upload(){
    
    let Data = {
      token: "" ,
      imageBase: this.myPhoto

    };
    let user = await this.storageService.get(AuthConstants.USERINFO);
    Data.token = user.token;
    
    this.httpService.post('tyshdhifihbsb', Data).subscribe(
      (res: any) => {
        console.log("DEBUG: uploasRep", res)
        if (parseInt(res.result.code) == 0)  {
          // get image info
          console.log("DEBUG: ok upload")
          this.getinfo()
        } else {
          console.log("DEBUG: upload not success",JSON.stringify(res))
        }
      },
      (error: any) => {
        console.log( "DEBUG:error upload", error)
      }
    );
    console.log("DEBUG: vao upload")
  }
    logoutAction() {
      this.authService.logout();
        window.location.reload();
        document.getElementById("tabs").style.display="None";
    }
    
    async getPic() {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
    }

    
    takePicture(sourceType: PictureSourceType) {
    
      var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.myPhoto  = imageData;//'data:image/jpeg;base64,' + 
        this.upload();
      }, (err) => {
        // Handle error
      });
  
    }

    async getinfo(){
      let user = await this.storageService.get(AuthConstants.USERINFO);
      this.postData.token = user.token;
      console.log("DEBUG::",this.postData.token);
      this.httpService.post('riywiushysh', this.postData).subscribe(
        (res: any) => {
          console.log("users info", res)
          if (parseInt(res.result.code) == 0)  {
            // get the User data.
          
            this.name = res.result.data.name
            this.email = res.result.data.email
            this.image = this.base_url + res.result.data.image
          } else {
            console.log("get users not success",JSON.stringify(res))
          }
          
        },
        (error: any) => {
          console.log(JSON.stringify(error))
        }
      );
    }

  }
