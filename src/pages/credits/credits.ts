import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CreditsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-credits',
  templateUrl: 'credits.html',
})
export class CreditsPage {

  data:any;data2:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
   
    this.storage.get("wallet").then(val=>{
      this.data=val;
      console.log(this.data);
    })


    // this.storage.get("userdata").then(val=>{
    //   this.data2=
    // })
   // this.data = JSON.parse(this.data2)[0].wallet;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditsPage');
  }

}
