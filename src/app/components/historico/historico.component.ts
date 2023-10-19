import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoricoApiService } from '../../services/historico-api-service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {
  contabilizarHistoricos: any[] = [];
  @Input() id: any;

  constructor(
    private route: ActivatedRoute,
    private HistoricoApiService: HistoricoApiService
  ) { }
  ngOnInit(): void {
    this.HistoricoApiService.getHistoricoById(this.id).subscribe(data => {
      this.contabilizarHistoricos = data.map((contabilizarHistorico: any) => ({
        ...contabilizarHistorico,
      }));
      console.log(this.contabilizarHistoricos);
    });
  }
}
