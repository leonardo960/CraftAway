import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreferitiPage } from './preferiti';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    PreferitiPage,
  ],
  imports: [
    IonicPageModule.forChild(PreferitiPage),
    TranslateModule.forChild()
  ],
})
export class PreferitiPageModule {}
