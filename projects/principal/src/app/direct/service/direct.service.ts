import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { DirectMensagem } from './interfaces/direct-mensagem';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DirectService {
  constructor(private realtime: AngularFireDatabase) {}

  async obterMensagens(convidadoId: string, currentUserId: string) {
    const path = await this.verficarMensagensCollectionPath(
      convidadoId,
      currentUserId
    );
    return this.realtime.list<DirectMensagem>(path).valueChanges();
  }

  async obterInformacoesConvidado(convidadoId: string) {
    const response = await axios.get(
      'https://us-central1-chat-emendes-com.cloudfunctions.net/obterUserInfo?uid=' +
        convidadoId
    );
    return response.data;
  }

  async verificarSeExisteDirect(currentUserId: string) {
    const snapShot = await this.realtime.database
      .ref('directs/lista/' + currentUserId)
      .once('value');
    return snapShot;
  }

  async verficarMensagensCollectionPath(
    convidadoId: string,
    currentUserId: string
  ) {
    let path = null;
    let directSnapShot = await this.realtime.database
      .ref(`directs/mensagens/${currentUserId}::${convidadoId}`)
      .once('value');
    if (directSnapShot.exists()) {
      path = `directs/mensagens/${currentUserId}::${convidadoId}`;
    } else {
      directSnapShot = await this.realtime.database
        .ref(`directs/mensagens/${convidadoId}::${currentUserId}`)
        .once('value');
      if (directSnapShot.exists()) {
        path = `directs/mensagens/${convidadoId}::${currentUserId}`;
      }
    }
    if (!path) {
      this.verirficarCriarDirect(
        convidadoId,
        currentUserId,
        `directs/mensagens/${currentUserId}::${convidadoId}`
      );
    }
    path = path ? path : `directs/mensagens/${currentUserId}::${convidadoId}`;

    return path;
  }

  async verirficarCriarDirect(convidadoId: string, currentUserId: string, path: string) {
    const retorno = await this.realtime.database
      .ref('directs/lista/' + currentUserId)
      .orderByChild('uid')
      .equalTo(convidadoId)
      .once('value');
    if (!retorno.exists()) {
      await this.adicionarPathALista(convidadoId, currentUserId, path);
      await this.adicionarPathALista(currentUserId, convidadoId, path);
    }
  }

  async adicionarPathALista(
    convidadoId: string,
    currentUserId: string,
    path: string
  ) {
    return await this.realtime.database
      .ref('directs/lista/' + currentUserId).child(convidadoId)
      .set({
        uid: convidadoId,
        path
      });
  }
}
