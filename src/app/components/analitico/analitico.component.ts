import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContabilizarApiService } from '../../services/contabilizar-api-service';
import { PrimeNGConfig } from 'primeng/api';
import { FormatarDataService } from '../../services/formatar-data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-analitico',
  templateUrl: './analitico.component.html',
  styleUrls: ['./analitico.component.css']
})
export class AnaliticoComponent implements OnInit {

  loading: boolean = true;
  selectedRow: any;
  lancamentos: any[] = [];

  constructor(
    private ContabilizarApiService: ContabilizarApiService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private formatarDataService: FormatarDataService
  ) { }

  ngOnInit(): void {
    // Solicitando a lista de lançamentos da API e fazendo o mapeamento dos dados
    this.ContabilizarApiService.getLancamentos().subscribe(data => {
      this.lancamentos = data.map(lancamento => ({
        ...lancamento,
        DataEfetiva: lancamento.DataEfetiva,
        UltimoStatus: lancamento.UltimoStatus,
        Debito: this.convertToNumber(lancamento.Debito),
        Credito: this.convertToNumber(lancamento.Credito)
      }));
      this.loading = false;
    });
    // Configurando traduções do componente PrimeNG
    this.primengConfig.setTranslation({
      startsWith: "Começa com",
      contains: "Contém",
      notContains: "Não contém",
      endsWith: "Termina com",
      equals: "Igual",
      notEquals: "Não igual",
      noFilter: "Sem filtro"
    });
  }

  // Método para converter valores em string para números
  convertToNumber(value: any): number {
    if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.'));
    }
    return value;
  }
  
  // Método para redirecionar para a página de edição
  editar(id: number): void {
    this.router.navigate(['editar', id]);
  }

  // Métodos para exportar dados para XLSX
  exporting: boolean = false;
  exportToXlsx(): void {
    this.exporting = true;
    setTimeout(() => {
      const tableElement: HTMLElement = document.querySelector('app-analitico-xlsx p-table')!;
      this.exportMirrorTableToXLSX(tableElement);
      this.exporting = false;
    });
  }
  exportMirrorTableToXLSX(tableElement: HTMLElement): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Contabilizar.xlsx');
}

}
