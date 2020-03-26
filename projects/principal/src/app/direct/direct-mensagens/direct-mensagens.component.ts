import { Component, OnInit } from '@angular/core';
import { DirectService } from '../service/direct.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../shared/services/firebase/authentication/authentication.service';

@Component({
  selector: 'app-direct-mensagens',
  templateUrl: './direct-mensagens.component.html',
  styleUrls: ['./direct-mensagens.component.scss']
})
export class DirectMensagensComponent implements OnInit {
  mensagens: any;
  convidado = null;
  currentUser: firebase.User;
  convidadoId = null;
  path = null;
  constructor(
    private directService: DirectService,
    private route: ActivatedRoute,
    private auth: AuthenticationService
  ) {
    this.convidadoId = this.route.snapshot.paramMap.get('id');
    this.authState();
  }

  voltar() {}
  async obterMensagens() {
    this.convidado = await this.directService.obterInformacoesConvidado(
      this.convidadoId
    );
    this.mensagens = this.directService.obterMensagens(
      this.convidadoId,
      this.currentUser.uid
    );
  }
  authState() {
    this.auth.authState.subscribe({
      next: async user => {
        this.currentUser = user;
        console.log(user.uid, this.convidadoId);
        const directSnapshot = await this.directService.verificarSeExisteDirect(
          user.uid
        );

        if (!directSnapshot.exists()) {
          this.path = await this.directService.verficarMensagensCollectionPath(
            this.convidadoId,
            user.uid
          );
        } else {
          this.path = directSnapshot.val().path;
        }
        this.obterMensagens();
      }
    });
  }

  ngOnInit(): void {}
}
