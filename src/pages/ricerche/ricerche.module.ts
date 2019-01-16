import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RicerchePage } from './ricerche';

@NgModule({
  declarations: [
    RicerchePage,
  ],
  imports: [
    IonicPageModule.forChild(RicerchePage),
  ],
})
export class RicerchePageModule {}
