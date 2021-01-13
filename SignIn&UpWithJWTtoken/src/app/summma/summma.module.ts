import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummmaPageRoutingModule } from './summma-routing.module';

import { SummmaPage } from './summma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummmaPageRoutingModule
  ],
  declarations: [SummmaPage]
})
export class SummmaPageModule {}
