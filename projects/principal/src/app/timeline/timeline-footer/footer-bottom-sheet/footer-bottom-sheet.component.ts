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
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<FooterBottomSheetComponent>
  ) {
   this.mostrarImagem = data.imagem;
  }

  fileChangeEvent(event: any): void {
    this.nome = event.target.files[0].name;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  recortar() {
    this.bottomSheetRef.dismiss({
      imagem: this.croppedImage.base64,
      texto: this.texto,
      nome: this.nome
    });
  }

  textareaKeyUp(textAreaEvent) {
    this.texto = textAreaEvent.target.value;
  }

  dismiss() {
    this.bottomSheetRef.dismiss();
  }

  ngOnInit(): void {}
}
