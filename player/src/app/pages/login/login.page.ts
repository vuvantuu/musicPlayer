import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants, AuthType } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  postData = {
    email : '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  validateInputs() {
    console.log(this.postData);
    let email = this.postData.email.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.email &&
      this.postData.password &&
      email.length > 0 &&
      password.length > 0
    );
  }

  loginAction() {
    if (this.validateInputs()) {
      this.authService.login(this.postData).subscribe(
        (res: any) => {
          console.log("result", res)
          if (parseInt(res.result.code) == 0)  {
            // Storing the User data.
            this.storageService
              .store(AuthConstants.AUTH, res.result.data.token)
              .then(res => {
                this.router.navigate(['home']);
              });
              this.authService.authType = res.result.data.type
              console.log("wow", this.authService.authType)
          } else {
            this.toastService.presentToast('Incorrect username and password.');
          }
          console.log(JSON.stringify(res))
        },
        (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.toastService.presentToast(
        'Please enter email/username or password.'
      );
    }
  }
}
