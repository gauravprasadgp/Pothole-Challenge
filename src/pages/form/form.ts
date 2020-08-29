import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {


  auth:AbstractControl;
  titl:AbstractControl;
  de:AbstractControl;

  formgroup: FormGroup;
  authority:string="";
  title:string="";
  desc:string="";

  constructor(public formbuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.formgroup = formbuilder.group({
      auth:['',[Validators.required]],
      titl:['',[Validators.required]],
      de:['',[Validators.required]]
    })

    this.auth = this.formgroup.controls['auth'];
    this.de = this.formgroup.controls['de'];
    this.titl = this.formgroup.controls['titl'];

  }

  // change() {
  //   if(this.authority!="" && this.title!="" && this.desc!="") {
  //     this.x = false;
  //   }
  // }

  Maps() {
    let body = {
      authority:this.authority,
      title:this.title,
      desc:this.desc
    }

    this.navCtrl.push(HomePage,{body:body});
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

}
