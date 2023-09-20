import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContabilizarApiService {

  private baseUrl: string = 'http://localhost:8088/api/apiContabilizar.asp';
  private baseUrlEditar: string = 'http://localhost:8088/api/apiContabilizarEditar.asp';

  constructor(private httpClient: HttpClient) { }

  getLancamentos(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl);
  }

  getLancamentoById(id: number): Observable<any> {
    const url = `${this.baseUrlEditar}?id=${id}`;
    return this.httpClient.get<any>(url);
  }

  updateLancamento(id: number, status: string, ultimoStatus: string): Observable<any> {
    const url = `${this.baseUrlEditar}?id=${id}`;
    const data = {
      Status: status,
      UltimoStatus: ultimoStatus
    };
    return this.httpClient.post<any>(url, data);
  }

}
