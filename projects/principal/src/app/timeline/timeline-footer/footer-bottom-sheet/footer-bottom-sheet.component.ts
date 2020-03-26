import { Component, OnInit, Inject, Input } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-footer-bottom-sheet',
  templateUrl: './footer-bottom-sheet.component.html',
  styleUrls: ['./footer-bottom-sheet.component.scss']
})
export class FooterBottomSheetComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  texto = '';
  nome = '';
  mostrarImagem = true;
  posicao = 4;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<FooterBottomSheetComponent>
  ) {
    this.mostrarImagem = data.imagem;
  }

  virar() {
    this.posicao = this.posicao - 1;
    this.posicao = this.posicao < 0 ? 3 : this.posicao;
  }

  fileChangeEvent(event): void {
    this.nome = event.target.files[0].name;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    console.log('image loaded');
  }
  cropperReady() {
    console.log('cropper ready');
  }
  loadImageFailed() {
    console.log('image load failed');
  }

  recortar() {
    this.bottomSheetRef.dismiss({
      imagem: this.croppedImage,
      texto: this.texto,
      nome: this.nome
    });
  }

  textoKeyUp(textAreaEvent: any) {
    this.texto = textAreaEvent.target.value;
  }

  dismiss() {
    this.bottomSheetRef.dismiss();
  }

  ngOnInit(): void {}
}
