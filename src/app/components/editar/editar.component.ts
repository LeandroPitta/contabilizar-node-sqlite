import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContabilizarApiService } from '../../services/contabilizar-api-service';

interface Statu {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})

export class EditarComponent implements OnInit {
  lancamento: any = {};

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private ContabilizarApiService: ContabilizarApiService
  ) { }

  ngOnInit(): void {
    // Obtém o ID do parâmetro da rota
    const id = +this.route.snapshot.paramMap.get('id')!;

    // Chama a API para obter os detalhes do lançamento
    this.ContabilizarApiService.getLancamentoById(id).subscribe(data => {
      this.lancamento = data;
      this.lancamento.UltimoStatus = this.convertStringToDate(data.UltimoStatus);
    });
    console.log(this.lancamento.UltimoStatus)
  }

  status: Statu[] = [
    { value: 'Pendente', viewValue: 'Pendente' },
    { value: 'Em tratamento', viewValue: 'Em tratamento' },
    { value: 'Concluido', viewValue: 'Concluido' },
  ];

  chamarApi() {
    alert('Salvar status')
  }

  convertStringToDate(dateTimeStr: string): Date {
    // Separar data e hora
    const parts = dateTimeStr.split(' ');
    const dateParts = parts[0].split('/');
    const timeParts = parts[1].split(':');

    // Construir objeto Date
    // Mês em JavaScript começa do 0 (0 = janeiro, 11 = dezembro), por isso subtraímos 1
    const date = new Date(
      +dateParts[2],  // ano
      +dateParts[1] - 1,  // mês
      +dateParts[0],  // dia
      +timeParts[0],  // hora
      +timeParts[1],  // minuto
      +timeParts[2]   // segundo
    );

    return date;
  }

}
