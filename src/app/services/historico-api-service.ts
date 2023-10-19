import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricoApiService {

  private baseUrl: string = 'http://localhost:3000/api/historico';

  constructor(private httpClient: HttpClient) { }

  getHistoricoById(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<any>(url);
  }

  insertHistorico(id: number, historico: string, funcionario: string): Observable<any> {
    const data = {
      ID: id,
      HISTORICO: historico,
      FUNCIONARIO: funcionario
    };
    return this.httpClient.post<any>(this.baseUrl, data);
  }
}
