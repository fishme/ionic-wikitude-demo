import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ArPage } from '../pages/ar/ar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'AR', component: ArPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */
      WikitudePlugin._sdkKey = "JkiEqHyrwS7D1VI++Rek/4UaiAVcdtLgODoN0YHu0WYk+etJGmcAFmT3qUHQy2xPeguhZDXIEc4/r/1P974r3Z/+0xD+SiEZk4NpFCkzMYj7xacDHyWBwu/uM/SsxIhmbdw1lBovMBxW035U5E9Wz/D3dpypZ9rdJo/e9vORSRxTYWx0ZWRfX6AwWqdKYwbhMdt3u4OXK5jEutOwg4TwxMQupWskxGQrVkS3z6FRQsqg7XfTlO9VP/bGnPRcTGT+OczdoRm5uMPnIPfA/dCoBNsIKdsOpGexzMOeigxzV1rAPHrJ7ZEC8wyxokgZdB6pETPjxbR9AY+ZcEzypRIBBhbRGqqwUbpHtja/LLJ2IgJX30xlFRJQyUE2lSI6FNYUJdgl+m9w7FokaKiYhDz64lZMjWbtHU+r/02YtqeB3H5mlS0Cv1AiznGHD5s2fJPbiqUwqsenZ5fgF1NMPz/XX1FHr/kDOQ+3dxtX26/4X7AG0GtmD5MxF/oKd8Fw+rOvvWcPhrOz140dmjCaewRf9HFiIXfpVwi+GUAAqS3i0Cd8eIGsbMISB2KyK4KfFGxksEFtPoQPlp932zaomAsw4DVKP6bJPMpMGe0d12c8YY/Kl8Xi7mKWabj1SwgVcuuatyfJo6Ns1EN+UlCkKCN7fVGoBUsZLcM297mN+nj/5vs=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
        function(success) {
          console.log("Your platform supports AR/Wikitude. Have fun developing!!");
        },
        function(fail) {
          console.log("Your platform failed to run AR/Wikitude: "+fail);
        },
        [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking
      );

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works
       * through the function below for the direction Ionic2 app --> Wikitude SDK
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
          WikitudePlugin.captureScreen(
            (absoluteFilePath) => {
              console.log("snapshot stored at:\n" + absoluteFilePath);

              // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
              WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
            },
            (errorMessage) => {
              console.log(errorMessage);
            },
            true, null
          );
        } else {
          alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
        console.log("Things went ok.");
      }

      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
        console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);
      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );
      */
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
