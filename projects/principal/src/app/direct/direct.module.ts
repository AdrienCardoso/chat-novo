import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectComponent } from './direct.component';
import { DirectMensagemComponent } from './direct-mensagens/direct-mensagem/direct-mensagem.component';
import { MaterialModule } from '../material-module';
import { DirectMensagensComponent } from './direct-mensagens/direct-mensagens.component';

@NgModule({
  declarations: [DirectComponent, DirectMensagemComponent, DirectMensagensComponent],
  imports: [
    CommonModule, MaterialModule
  ]
})
export class DirectModule { }
