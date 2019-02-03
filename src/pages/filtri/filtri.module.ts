import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltriPage } from './filtri';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    FiltriPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltriPage),
    TranslateModule.forChild()
  ],
})
export class FiltriPageModule {}
