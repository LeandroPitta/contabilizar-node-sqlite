import { Component, OnInit } from '@angular/core';
import { ContabilizarApiService } from '../../services/contabilizar-api-service';

@Component({
  selector: 'app-analitico',
  templateUrl: './analitico.component.html',
  styleUrls: ['./analitico.component.css']
})
export class AnaliticoComponent implements OnInit {

  lancamentos: any[] = [];

  constructor(private ContabilizarApiService: ContabilizarApiService) { }
  ngOnInit(): void {
    this.ContabilizarApiService.getLancamentos().subscribe(data => {
      this.lancamentos = data;
    });
  }

}
