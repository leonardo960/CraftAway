import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MieInserzioniPage } from './mie-inserzioni';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    MieInserzioniPage,
  ],
  imports: [
    IonicPageModule.forChild(MieInserzioniPage),
    TranslateModule.forChild()
  ],
})
export class MieInserzioniPageModule {}
