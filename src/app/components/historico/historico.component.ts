import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoricoApiService } from '../../services/historico-api-service';
import { MatDialog } from '@angular/material/dialog';
import { HistoricoDialogComponent } from '../historico-dialog/historico-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Ao inicializar o componente, obtém os históricos com base no ID.
    this.HistoricoApiService.getHistoricoById(this.id).subscribe(data => {
      this.contabilizarHistoricos = data.map((contabilizarHistorico: any) => ({
        ...contabilizarHistorico,
      }));
    });
  }

  abrirDialog(): void {
    // Abre um diálogo para adicionar um novo histórico.
    const dialogRef = this.dialog.open(HistoricoDialogComponent, {
      width: '50%',
      data: { id: this.id }
    });

    // Assina os eventos após o fechamento do diálogo.
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Histórico salvo com sucesso', 'Fechar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar']
        });

        // Atualiza a lista de históricos após adicionar um novo.
        this.HistoricoApiService.getHistoricoById(this.id).subscribe(data => {
          this.contabilizarHistoricos = data.map((contabilizarHistorico: any) => ({
            ...contabilizarHistorico,
          }));
        });
      }
    });
  }
}
