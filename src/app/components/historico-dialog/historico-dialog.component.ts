import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HistoricoApiService } from '../../services/historico-api-service';

@Component({
  selector: 'app-historico-dialog',
  templateUrl: './historico-dialog.component.html',
  styleUrls: ['./historico-dialog.component.css']
})

export class HistoricoDialogComponent {
  historicoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<HistoricoDialogComponent>,
    private historicoApiService: HistoricoApiService
  ) {
    this.historicoForm = this.formBuilder.group({
      funcionario: ['', Validators.required], // Aqui você pode adicionar validações personalizadas, se necessário
      texto: ['', Validators.required],
    });
  }

  salvarHistorico() {
    if (this.historicoForm.valid) {
      const funcionario = this.historicoForm.get('funcionario')!.value;
      const texto = this.historicoForm.get('texto')!.value;
      const id = 1; // Substitua pelo ID correto, se necessário

      this.historicoApiService.insertHistorico(id, texto, funcionario).subscribe(
        (response) => {
          // A ação foi bem-sucedida, você pode realizar a lógica desejada, como fechar o diálogo e atualizar a lista de históricos.
          this.dialogRef.close({ texto, funcionario }); // Fecha o diálogo e passa os dados de volta ao componente principal.
        },
        (error) => {
          // Lidar com erros, se necessário
          console.error('Erro ao inserir histórico:', error);
        }
      );
    }
  }

  cancelar() {
    this.dialogRef.close(); // Fecha o diálogo sem salvar nada.
  }
}
