import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../shared/services/firebase/authentication/authentication.service';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private auth: AuthenticationService,
    private db: AngularFireDatabase
  ) {}

  async loginGoogle(): Promise<{ ok: boolean; error: any }> {
    try {
      const credentials = await this.auth.signInWithGoogleAuthProvider();
      this.gravarUsuario(credentials);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async loginGitHub(): Promise<{ ok: boolean; error: any }> {
    try {
      const credentials = await this.auth.signInWithGithubAuthProvider();
      await this.gravarUsuario(credentials);
      return { ok: true, error: null };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async gravarUsuario(
    credentials: firebase.auth.UserCredential
  ): Promise<boolean> {
    try {
      await this.db.database
        .ref('usuarios')
        .child(credentials.user.uid)
        .set(credentials.additionalUserInfo);
      return true;
    } catch {
      return false;
    }
  }
}
