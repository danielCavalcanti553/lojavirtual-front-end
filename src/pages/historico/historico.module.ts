import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoPage } from './historico';
import { HistoricoService } from '../../services/domain/historico.service';

@NgModule({
  declarations: [
    HistoricoPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoPage),
  ],
  providers: [
    HistoricoService
  ]
})
export class HistoricoPageModule {}
