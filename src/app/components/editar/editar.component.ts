import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContabilizarApiService } from '../../services/contabilizar-api-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormatarDataService } from '../../services/formatar-data.service';
// Interface para mapear os possíveis valores de status
interface Status {
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
  debito: number = 0;
  credito: number = 0;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private ContabilizarApiService: ContabilizarApiService,
    private snackBar: MatSnackBar,
    private formatarDataService: FormatarDataService
  ) { }

  ngOnInit(): void {
    // Obtendo o ID do lançamento a partir da rota
    const id = +this.route.snapshot.paramMap.get('id')!;
    // Solicitando os dados do lançamento pelo ID da API
    this.ContabilizarApiService.getLancamentoById(id).subscribe(data => {
      this.lancamento = data;
      this.lancamento.UltimoStatus = this.formatarDataService.convertToDate(data.UltimoStatus);
      this.debito = this.convertToNumber(this.lancamento.Debito);
      this.credito = this.convertToNumber(this.lancamento.Credito);
    });    
  }
  // Definindo os possíveis valores de status
  status: Status[] = [
    { value: 'Pendente', viewValue: 'Pendente' },
    { value: 'Em tratamento', viewValue: 'Em tratamento' },
    { value: 'Concluido', viewValue: 'Concluido' },
  ];
  // Método para chamar a API e atualizar o lançamento
  chamarApi() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const formattedDate = this.formatarDataService.formatDateToCustomString(this.lancamento.UltimoStatus);
    this.ContabilizarApiService.updateLancamento(id, this.lancamento.Status, formattedDate)
      .subscribe(
        response => {
          this.snackBar.open('Atualizado com sucesso', 'Fechar', {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar']
          });
          this.router.navigate(['']);          
        },
        error => {
          console.error('Erro ao atualizar lançamento:', error);
          alert('Houve um erro ao atualizar os dados. Tente novamente mais tarde.');
        }
      );
  }
  // Método para converter valores em string para números
  convertToNumber(value: any): number {
    if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.'));
    }
    return value;
  }
}
