import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DettaglioInserzionePage } from './dettaglio-inserzione';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    DettaglioInserzionePage,
  ],
  imports: [
    IonicPageModule.forChild(DettaglioInserzionePage),
    TranslateModule.forChild()
  ],
})
export class DettaglioInserzionePageModule {}
