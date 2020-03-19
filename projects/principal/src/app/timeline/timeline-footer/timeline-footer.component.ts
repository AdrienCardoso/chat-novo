import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FooterBottomSheetComponent } from './footer-bottom-sheet/footer-bottom-sheet.component';
import { TimelineService } from '../services/timeline.service';
import { AngularFireUploadTask } from '@angular/fire/storage';

@Component({
  selector: 'app-timeline-footer',
  templateUrl: './timeline-footer.component.html',
  styleUrls: ['./timeline-footer.component.scss']
})
export class TimelineFooterComponent implements OnInit {
   perc = null;
  constructor(
    private bottomSheet: MatBottomSheet,
    private timeLineService: TimelineService
  ) {}

  openBottomSheet(): void {
    this.bottomSheet
      .open(FooterBottomSheetComponent, { data: {imagem: this.timeLineService.admin.imagemHabilitada} })
      .afterDismissed()
      .subscribe({
        next: data => {
          if (data) {
            this.adicionarImagem(data);
          }
        }
      });
  }

  async adicionarImagem(data: any) {
    const pushId = this.timeLineService.criarPushId();
    let retornoImagem: {
      pushId: string;
      uploadTask: AngularFireUploadTask;
    } = null;

    if (data.imagem) {
      retornoImagem = await this.timeLineService.adicionarImagem(
        pushId,
        data.imagem,
        data.nome
      );
      retornoImagem.uploadTask.percentageChanges().subscribe({
        next: perc => {
          this.perc = perc.toFixed(0);
        },
        complete: () => {
          this.perc = null;
        }
      });
      retornoImagem.uploadTask.then(async taskSnapshot => {
        const url = await taskSnapshot.ref.getDownloadURL();
        this.timeLineService.adicionarMensagem(pushId, data.texto, url);
      });
    } else {
      this.timeLineService.adicionarMensagem(pushId, data.texto);
    }
  }

  ngOnInit(): void {}
}
