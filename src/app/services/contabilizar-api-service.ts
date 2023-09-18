import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContabilizarApiService {

  private baseUrl: string = 'http://localhost:8088/api/apiContabilizar.asp';

  constructor(private httpClient: HttpClient) { }

  getLancamentos(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl);
  }

}
