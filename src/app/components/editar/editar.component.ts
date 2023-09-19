import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface statu {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {

  constructor(
    public router: Router
  ) { }

  status: statu[] = [
    {value: 'Pendente-0', viewValue: 'Pendente'},
    {value: 'Em-tratamento-1', viewValue: 'Em tratamento'},
    {value: 'Concluido-2', viewValue: 'Concluido'},
  ];

  chamarApi() {
    alert('Salvar status')
  }

}
