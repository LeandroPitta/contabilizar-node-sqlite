import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-analitico-xlsx',
  templateUrl: './analitico-xlsx.component.html',
  styleUrls: ['./analitico-xlsx.component.css']
})
export class AnaliticoXlsxComponent {
  @Input() lancamentos: any[] = [];
}
