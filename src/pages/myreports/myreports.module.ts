import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyreportsPage } from './myreports';

@NgModule({
  declarations: [
    MyreportsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyreportsPage),
  ],
})
export class MyreportsPageModule {}
