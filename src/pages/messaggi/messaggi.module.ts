import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessaggiPage } from './messaggi';

@NgModule({
  declarations: [
    MessaggiPage,
  ],
  imports: [
    IonicPageModule.forChild(MessaggiPage),
  ],
})
export class MessaggiPageModule {}
