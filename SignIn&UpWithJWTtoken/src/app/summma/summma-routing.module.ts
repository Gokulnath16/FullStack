import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummmaPage } from './summma.page';

const routes: Routes = [
  {
    path: '',
    component: SummmaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummmaPageRoutingModule {}
