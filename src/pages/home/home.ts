import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController, NavParams } from 'ionic-angular';
import { GoogleMap, GoogleMaps, Marker, GoogleMapsEvent, Environment, GoogleMapsAnimation, GoogleMapOptions } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import {Http} from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  show = true;
  lt1:any;
  lt2:string;
  lng1:any;
  lng2:string;
  // n = 0;
  map: GoogleMap;
  onePic: any;
  image: File;
  formbody:any;
  files:Blob;
  path;
  loc:string;
  constructor(private navParams: NavParams,public http:Http,private camera: Camera, public navCtrl: NavController, private geolocation: Geolocation, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) {
    this.formbody = this.navParams.get('body');
    console.log(this.formbody);
    this.addMarker();
  }
  ionViewDidLoad() {
    this.loadMap();
    
  }
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lt1 = resp.coords.latitude;
      this.lng1 = resp.coords.longitude;
      this.lt2 = this.lt1;
      this.lng2 = this.lng1;

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          zoom: 15,
          tilt: 30
        }
      }
      
      console.log("User coordinates:"+this.lt1+" "+this.lng1);
      this.map = GoogleMaps.create('map_canvas', mapOptions);
      let marker: Marker = this.map.addMarkerSync({
        title: 'My location',
        size: {
          width: 32,
          height: 24
        },
        //snippet: '@ionic-native/google-maps',
        icon: 'blue',
        infoWindowAnchor: [16, 0],
        anchor: [16, 32],
        flat: false,
        //rotation: 32,
        visible: true,
        styles: {
          'text-align': 'center',
          'font-style': 'italic',
          'font-weight': 'bold',
          'color': 'red'
        },
        animation: GoogleMapsAnimation.DROP,

        zIndex: 0,

        disableAutoPan: true,
        position: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        },
        draggable: false
      })

      console.log("User latitude:"+resp.coords.latitude+"\n"+"User longitude:"+resp.coords.longitude);

      marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((res) => {

        alert(JSON.stringify(res));


      });

    })
  }

  dummyfunc() {
    this.addMarker();
    this.show = false;
  }

  addMarker() {
      this.geolocation.getCurrentPosition().then((resp) => {
        let marker: Marker = this.map.addMarkerSync({
          title: 'Pothole Location!',
          size: {
            width: 32,
            height: 24
          },
          //snippet: '@ionic-native/google-maps',
          icon: 'red',
          infoWindowAnchor: [16, 0],
          anchor: [16, 32],
          flat: false,
          //rotation: 32,
          visible: true,
          styles: {
            'text-align': 'center',
            'font-style': 'italic',
            'font-weight': 'bold',
            'color': 'red'
          },
          animation: GoogleMapsAnimation.DROP,
  
          zIndex: 0,
  
          disableAutoPan: true,
          position: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          draggable: true,
        })
  
        marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe((res) => {
          this.lt2 = res[0].lat;
          this.lng2 = res[0].lng;
          console.log(this.lt2+" "+this.lng2);
          alert(JSON.stringify(res));
          // console.log("Pothole latitude:"+res.coords.latitude+"\n"+"Pothole Longitude:"+res.coords.longitude)
  
        });
      })
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: '(For Testing!)',
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
    actionSheet.present();
  }

  public takePicture(sourceType) {
    //Create options for the camera Dialog
    var options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    //Get the data of an image
    this.camera.getPicture(options).then(url =>{
      
      
      //console.log("Image Path : "+ url);
      this.path = 'data:image/jpeg;base64,'+url;
      console.log(this.path);
      this.files=this.base64ImageToBlob(this.path);

      this.upload();

          

    }, err =>{
      alert("Error : "+err);
    });

  }

  base64ImageToBlob(str) {
    // extract content type and base64 payload from original string
    var pos = str.indexOf(';base64,');
    var type = str.substring(5, pos);
    var b64 = str.substr(pos + 8);
  
    // decode base64
    var imageContent = atob(b64);
  
    // create an ArrayBuffer and a view (as unsigned 8-bit)
    var buffer = new ArrayBuffer(imageContent.length);
    var view = new Uint8Array(buffer);
  
    // fill the view, using the decoded base64
    for(var n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
  
    // convert ArrayBuffer to Blob
    var blob = new Blob([buffer], { type: type });
  
    return blob;
  }


  upload(){

    const body = new FormData();
    body.append("lat1",this.lt1);
    body.append("lat2",this.lt2);
    body.append("long1",this.lng1);
    body.append("long2",this.lng2);
    body.append("userid","1");
    body.append("title",this.formbody.title);
    body.append("description",this.formbody.desc);
    body.append("authority",this.formbody.authority);
    body.append('filename',this.files,'image.jpeg');
    console.log(body);
    
     if(this.distance(this.lt1,this.lng1,this.lt2,this.lng2,'')>0.003107)    
     alert("Please select exact location of pothole ");
     else{
        this.http.post('http://34.93.191.211:3000/upload',body).subscribe(res=>{
        console.log(res);
        alert(res.json()[0].success);
        this.navCtrl.setRoot('ReportPage');
      })
     }

 
            
  }
  


 distance(lat1,lon1,lat2,lon2,unit)
{
	 if ((lat1 == lat2) && (lon1 == lon2)) {
	 	return 0;
	 }
	 else {
	 	var radlat1 = Math.PI * lat1/180;
	 	var radlat2 = Math.PI * lat2/180;
	 	var theta = lon1-lon2;
	 	var radtheta = Math.PI * theta/180;
	 	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	 	if (dist > 1) {
	 		dist = 1;
	 	}
	 	dist = Math.acos(dist);
	 	dist = dist * 180/Math.PI;
	 	dist = dist * 60 * 1.1515;
	 	if (unit=="K") { dist = dist * 1.609344 }
	 	if (unit=="N") { dist = dist * 0.8684 }
	 	return dist;
     
    }
  }


}
