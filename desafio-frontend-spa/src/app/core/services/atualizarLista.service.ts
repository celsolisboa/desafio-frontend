import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtualizarListaService {

  static alterouValor = new EventEmitter<boolean>();

  attlista: boolean = false;

  constructor() { }

  atualizaLista() {
    this.attlista = true
    AtualizarListaService.alterouValor.emit(this.attlista);
  }

}
