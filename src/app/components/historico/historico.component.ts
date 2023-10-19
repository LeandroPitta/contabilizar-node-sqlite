import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoricoApiService } from '../../services/historico-api-service';
import { MatDialog } from '@angular/material/dialog';
import { HistoricoDialogComponent } from '../historico-dialog/historico-dialog.component';

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
    private HistoricoApiService: HistoricoApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.HistoricoApiService.getHistoricoById(this.id).subscribe(data => {
      this.contabilizarHistoricos = data.map((contabilizarHistorico: any) => ({
        ...contabilizarHistorico,
      }));
    });
  }

  abrirDialog(): void {
    const dialogRef = this.dialog.open(HistoricoDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // O resultado é o que você deseja fazer com os dados inseridos no diálogo.
      if (result) {
        // Aqui, você pode realizar a lógica com os dados do diálogo. Por exemplo, você pode atualizar sua lista de históricos com os novos dados.
        console.log('Texto do histórico inserido:', result);
        // Faça o que for necessário com os dados, como atualizar a lista de históricos.
      } else {
        // O usuário clicou em "Cancelar" ou fechou o diálogo sem salvar.
        console.log('Diálogo cancelado');
      }
    });
  }
}
