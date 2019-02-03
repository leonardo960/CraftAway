import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RicerchePage } from './ricerche';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    RicerchePage,
  ],
  imports: [
    IonicPageModule.forChild(RicerchePage),
    TranslateModule.forChild()
  ],
})
export class RicerchePageModule {}
