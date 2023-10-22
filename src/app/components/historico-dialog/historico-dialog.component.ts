import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HistoricoApiService } from '../../services/historico-api-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-historico-dialog',
  templateUrl: './historico-dialog.component.html',
  styleUrls: ['./historico-dialog.component.css']
})

export class HistoricoDialogComponent {
  historicoForm: FormGroup;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<HistoricoDialogComponent>,
    private historicoApiService: HistoricoApiService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.historicoForm = this.formBuilder.group({
      funcionario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      texto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    });
    this.id = data.id;
  }

  salvarHistorico() {
    if (this.historicoForm.valid) {
      const funcionario = this.historicoForm.get('funcionario')!.value;
      const texto = this.historicoForm.get('texto')!.value;
      const id = this.id;

      this.historicoApiService.insertHistorico(id, texto, funcionario).subscribe(
        (response) => {
          if (response.maxRegistro === 0) {
            this.dialogRef.close({ texto, funcionario });
          } else {
            this.cancelar();
            this.snackBar.open(
              'Não é possível incluir mais de 10 registros no histórico',
              'Fechar',
              {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['custom-snackbar']
              }
            );
          }
        },
        (error) => {
          console.error('Erro ao inserir histórico:', error);
        }
      );
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
