import { Component, OnInit, Input } from '@angular/core';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-timeline-mensagem',
  templateUrl: './timeline-mensagem.component.html',
  styleUrls: ['./timeline-mensagem.component.scss']
})
export class TimelineMensagemComponent implements OnInit {
  @Input() mensagem: any;
  @Input() mostrarFavoritos: boolean;
  constructor() {}

  ngOnInit(): void {}
}
