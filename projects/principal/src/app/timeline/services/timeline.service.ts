import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Mensagem } from './interfaces/mensagem';
import { StorageService } from '../../shared/services/firebase/storage/storage.service';
import { AuthenticationService } from '../../shared/services/firebase/authentication/authentication.service';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { AdminService } from '../../shared/services/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  currentUser: any;

  constructor(
    private realtime: AngularFireDatabase,
    private storage: StorageService,
    private auth: AuthenticationService,
    public admin: AdminService
  ) {
    this.auth.authState.subscribe({
      next: user => {
        this.currentUser = user;
      }
    });
  }

  criarPushId() {
    return this.realtime.createPushId();
  }

  async adicionarMensagem(pushId: string, texto: string, urlImagem?: string) {
    const mensagem = {
      texto,
      time: new Date().getTime(),
      uid: this.currentUser.uid,
      nome: this.currentUser.displayName,
      avatar: this.currentUser.photoURL,
      imagem: urlImagem ? urlImagem : null,
      id: pushId
    };

    return await this.realtime.database
      .ref('mensagens')
      .child(pushId)
      .set(mensagem);
  }

  obterMensagens() {
    return this.realtime
      .list<Mensagem>('mensagens', ref => ref.limitToLast(30))
      .valueChanges();
  }

  async adicionarImagem(pushId: string, imagem: string, name: string) {
    const file = await this.storage.base64ToFile(imagem, name, {
      type: 'image/jpeg'
    });

    const uid = this.auth.currentUser.uid;
    const uploadTask = (this.storage.upload(`imagens/${uid}/${pushId}`, file, {
      cacheControl: 'public, max-age=31536000'
    }) as unknown) as AngularFireUploadTask;
    return { pushId, uploadTask };
  }
}
