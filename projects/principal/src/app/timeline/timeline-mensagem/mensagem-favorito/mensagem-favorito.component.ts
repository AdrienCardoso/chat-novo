import { Component, OnInit, Input } from '@angular/core';
import { MensagemFavoritoService } from './service/mensagem-favorito.service';
import { AuthenticationService } from '../../../shared/services/firebase/authentication/authentication.service';

@Component({
  selector: 'app-mensagem-favorito',
  templateUrl: './mensagem-favorito.component.html',
  styleUrls: ['./mensagem-favorito.component.scss']
})
export class MensagemFavoritoComponent implements OnInit {
  totalFavoritos = '';
  currentUserUid = '';
  badgColor = '';
  @Input() mensagemId: string;
  nome = '';
  constructor(
    private favoritosService: MensagemFavoritoService,
    private auth: AuthenticationService
  ) {
    this.auth.authState.subscribe({
      next: user => {
        this.currentUserUid = user.uid;
        this.nome = user.displayName;
        this.obterTotalDeFavoritos();
      }
    });
  }

  obterTotalDeFavoritos() {
    this.favoritosService.obterTotalDeFavoritos(this.mensagemId).subscribe({
      next: resultado => {
        if (resultado.length > 0) {
          this.badgColor = 'warn';
          this.totalFavoritos = resultado.length.toString();
        } else {
          this.badgColor = '';
          this.totalFavoritos = '';
        }
      }
    });
  }
  favoritar() {
    this.favoritosService.favoritarMensagem(
      this.mensagemId,
      this.currentUserUid,
      this.nome
    );
  }

  ngOnInit(): void {}
}
