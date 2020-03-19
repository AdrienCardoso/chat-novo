import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MensagemFavoritoService {

  constructor(private realtime: AngularFireDatabase) { }


  favoritarMensagem(mensagemId: string, usuarioId: string, nome: string) {
    return this.realtime.database
      .ref('favoritos')
      .child(mensagemId)
      .child(usuarioId)
      .set({ uid: usuarioId, nome, time: new Date().valueOf() });
  }

  desvaforitarMensagem(mensagemId: string, usuarioId: string) {
    return this.realtime.database
      .ref('mensagens')
      .child(mensagemId)
      .child('favoritos')
      .child(usuarioId)
      .remove();
  }

  obterTotalDeFavoritos(mensagemId: string) {
    return this.realtime
      .list(`favoritos/${mensagemId}`)
      .valueChanges();
  }
}
