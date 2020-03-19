import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { TimelineMensagemComponent } from './timeline-mensagem/timeline-mensagem.component';
import { MensagemFavoritoComponent } from './timeline-mensagem/mensagem-favorito/mensagem-favorito.component';
import { TimelineFooterComponent } from './timeline-footer/timeline-footer.component';
import { FooterBottomSheetComponent } from './timeline-footer/footer-bottom-sheet/footer-bottom-sheet.component';
import { MaterialModule } from '../material-module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    TimelineComponent,
    TimelineMensagemComponent,
    MensagemFavoritoComponent,
    TimelineFooterComponent,
    FooterBottomSheetComponent
  ],
  imports: [CommonModule, MaterialModule, ImageCropperModule, MomentModule]
})
export class TimelineModule {}
