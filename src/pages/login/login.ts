import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email;
  pass;

  constructor(public navCtrl: NavController,private network: Network, public navParams: NavParams,public http:Http,public storage:Storage,public alertCtrl: AlertController) {
    
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });
    console.log(disconnectSubscription);
    if(disconnectSubscription.closed==true){
      alert("Check your internet!")
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    var body={
      email:this.email,
      pass:this.pass
    }
    this.http.post('http://34.93.191.211:3000/user_login',body).subscribe(res=>{
      console.log(res.status);
      if(res.status==0 || res.status==500){
        alert("Please try again!");
          }
      else if(res.json().status==200){
        this.navCtrl.setRoot('ReportPage');
        console.log(res.json().data);
        this.storage.set("userdata",JSON.stringify(res.json().data));
        this.storage.set("wallet",JSON.stringify(res.json().data[0].wallet));
      }
      else
      alert(res.json().success);
    },
  error=>{
    alert("Please try again!");
  })
    
  }

  signup(){``
    this.navCtrl.push('SignupPage');
  }

  showAlert(title,subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']    
    });
    alert.present();
  }

}
