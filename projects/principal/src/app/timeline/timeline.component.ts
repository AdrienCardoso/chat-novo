import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/firebase/authentication/authentication.service';
import { TimelineService } from './services/timeline.service';
import 'moment/locale/pt-br';
import { AdminService } from '../shared/services/admin/admin.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  user = null;
  mensagens: any;

  constructor(
    private auth: AuthenticationService,
    public timeLineService: TimelineService
  ) {
    this.auth.authState.subscribe({
      next: user => {
        this.user = user;
        this.obterMensagens();
      }
    });
  }

  obterMensagens() {
    this.mensagens = this.timeLineService.obterMensagens();
  }

  sair() {
    this.auth.signOut();
  }
  ngOnInit(): void {}
}
