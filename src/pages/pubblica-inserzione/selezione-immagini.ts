import { Component } from "@angular/core";
import { ViewController, NavParams, Events } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { Camera, CameraOptions } from "@ionic-native/camera";

@Component({
    template: 
    `
    <style>
      .test{
        background-image: url(../../assets/imgs/craftaway_no_content.png) !important;
        height: 40vh !important;
        width: 40vh !important;
        background-size: contain !important;
        display: inline-block !important;
      }
      .test2{
        height: 40vh !important;
        width: 40vh !important;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        background-origin: center !important;
        display: inline-block !important;
      }
      ion-card{
        background-color: transparent !important;
        box-shadow: none !important;
      }
    </style>
    <ion-content>
      <ion-slides>
        <ng-container *ngFor="let img of immagini; let i = index">
          <ion-slide>
            <ion-card [ngStyle]="{'background-image':'url(data:image/jpg;base64,' + img + ')'}" class="test2"></ion-card>
          </ion-slide>
        </ng-container>
        <ng-container>
          <ion-slide>
            <ion-card (click)="selezionaImmagine()" class="test"></ion-card>
          </ion-slide>
        </ng-container>
      </ion-slides>
    </ion-content>
    `
  })
  
  export class SelezioneImmagini {
    immagini : string[] = [];
    constructor(public viewCtrl: ViewController, public params : NavParams, public events: Events, public translateService : TranslateService, public camera : Camera) {
      this.immagini = params.get("immagini");
    }
  
    close() {
      this.viewCtrl.dismiss();
    }
  
    selezionaImmagine(){
      const options: CameraOptions = {
        quality: 10,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: 0
      }
      
      this.camera.getPicture(options).then((imageData) => {
        this.immagini.push(imageData);
        console.log(this.immagini);
      }, (err) => {
       // Handle error
      });
    }
  
    
  
  }