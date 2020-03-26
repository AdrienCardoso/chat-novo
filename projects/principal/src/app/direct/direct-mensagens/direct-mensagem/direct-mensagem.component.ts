import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/firebase/authentication/authentication.service';
@Component({
  selector: 'app-direct-mensagem',
  templateUrl: './direct-mensagem.component.html',
  styleUrls: ['./direct-mensagem.component.scss']
})
export class DirectMensagemComponent implements OnInit {
  @Input() mensagem: any;
  currentUser: firebase.User;
  constructor(private auth: AuthenticationService) {
    this.authState();
  }

  authState() {
    this.auth.authState.subscribe({
      next: user => {
        this.currentUser = user;
      }
    });
  }
  ngOnInit(): void {}
}
