import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
    this.data=this.storage.get("userdata");
    console.log('data');
    console.log(this.data);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  logout() {

    this.storage.set("userdata",null);
    this.navCtrl.setRoot('LoginPage');
  }

  form() {
    this.navCtrl.push('FormPage');
  }


  myreports(){
    this.navCtrl.push('MyreportsPage');
  }

  credits(){
    this.navCtrl.push('CreditsPage');
  }

}
