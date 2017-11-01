import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ArPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ar',
  templateUrl: 'ar.html',
})
export class ArPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArPage');
  }

  ionViewDidEnter() {

    var startupConfiguration: any = {"camera_position": "back"};

    WikitudePlugin.loadARchitectWorld(
      function (success) {
        console.log("ARchitect World loaded successfully.");
      },
      function (fail) {
        console.log("Failed to load ARchitect World!");
      },
//          "www/assets/3_3dModels_1_3dModelOnTarget/index.html", // (1) if you have a IR (Image Recognition) World, use this
//          ["ir"], // (1) if you have a IR (Image Recognition) World, use this
      "www/assets/test/index.html",  // (2) if you have a GeoLocation World, use this
      ["2d_tracking"],  // (2) if you have a GeoLocation World, use this
// you find other samples or Wikitude worlds in Wikitude Cordova Plugin
// which can be downloaded from here: https://github.com/Wikitude/wikitude-cordova-plugin/archive/v5.3.1-3.3.2.zip
      <JSON>startupConfiguration
    );
  }
}
