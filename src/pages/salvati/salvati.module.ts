import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalvatiPage } from './salvati';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    SalvatiPage,
  ],
  imports: [
    IonicPageModule.forChild(SalvatiPage),
    TranslateModule.forChild()
  ],
})
export class SalvatiPageModule {}
