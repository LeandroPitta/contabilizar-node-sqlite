import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {
  mensagem: string = "";

  ngOnInit() {
    const hora = new Date().getHours();

    if (hora >= 6 && hora < 12) {
      this.mensagem = "Bom dia";
    } else if (hora >= 12 && hora < 19) {
      this.mensagem = "Boa tarde";
    } else {
      this.mensagem = "Boa noite";
    }
  }
}
