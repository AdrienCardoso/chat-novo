import { Injectable } from '@angular/core';
import { AuthenticationService } from '../firebase/authentication/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private db: AngularFireDatabase,
    private fire: AngularFirestore,
    private auth: AuthenticationService
  ) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.habilitarDesabilitarItemsMensagem();
        this.autoSignOut();
      }
    });
  }

  public imagemHabilitada: boolean;
  public formHabilitado: boolean;
  public favoritos: boolean;
  public timeline: boolean;

  private habilitarDesabilitarItemsMensagem() {
    this.fire
      .collection('regras')
      .doc('mensagens').valueChanges()
      .subscribe({
        next: (docSnapshot: any) => {
          this.formHabilitado = docSnapshot.form;
          this.favoritos = docSnapshot.favoritos;
          this.imagemHabilitada = docSnapshot.imagens;
          this.timeline = docSnapshot.timeline;
        }
      });
  }

  private habilitarDesabilitarImagens() {
    this.db
      .object('admin/mensagens/imagens')
      .valueChanges()
      .subscribe(s => (this.imagemHabilitada = s as boolean));
  }

  private habilitarDesabilitarFavoritos() {
    this.db
      .object('admin/mensagens/favoritos')
      .valueChanges()
      .subscribe(s => (this.favoritos = s as boolean));
  }

  private habilitarDesabilitarForm() {
    this.db
      .object('admin/mensagens/form')
      .valueChanges()
      .subscribe(s => (this.formHabilitado = s as boolean));
  }

  private autoSignOut() {
    this.fire
      .collection('regras')
      .doc('sistema')
      .valueChanges()
      .subscribe({
        next: (docSnapshot: any) => {
          if (docSnapshot.signout) {
            this.auth.signOut();
          }
        }
      });

    // this.db
    //   .object('admin/sistema/signout')
    //   .valueChanges()
    //   .subscribe(s => {
    //     console.log(s);
    //     if (s) {
    //       this.auth.signOut();
    //     }
    //   });
  }
}
