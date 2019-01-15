import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltriPage } from './filtri';

@NgModule({
  declarations: [
    FiltriPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltriPage),
  ],
})
export class FiltriPageModule {}
