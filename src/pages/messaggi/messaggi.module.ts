import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessaggiPage } from './messaggi';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    MessaggiPage,
  ],
  imports: [
    IonicPageModule.forChild(MessaggiPage),
    TranslateModule.forChild()
  ],
})
export class MessaggiPageModule {}
