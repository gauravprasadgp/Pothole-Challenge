import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the MyreportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myreports',
  templateUrl: 'myreports.html',
})
export class MyreportsPage {

  url = "http://34.93.191.211:3000/get_myreport";
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.getLocalData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyreportsPage');

  }

  getLocalData() {
    let body = {
      userid:1,
    }
    this.http.post(this.url,body).subscribe(data => {
      this.data = data.json();
      console.log(data);
    });
  }


}
