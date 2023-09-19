import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContabilizarApiService } from '../../services/contabilizar-api-service';
import { PrimeNGConfig } from 'primeng/api';


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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ContabilizarApiService.getLancamentos().subscribe(data => {
      this.lancamentos = data;
      this.loading = false;
    });

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

  editar(): void {
    this.router.navigate(['editar']);
  }
}
