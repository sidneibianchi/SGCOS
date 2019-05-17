import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutoBusca } from '../_models/AutoBusca';

@Injectable({
  providedIn: 'root'
})
export class AutoBuscaService {
  baseURL = 'http://localhost:5000/api/autobusca';

  constructor(private http: HttpClient) { }

  getAllAutoBusca(): Observable<AutoBusca[]> {
    return this.http.get<AutoBusca[]>(this.baseURL);
  }

  getAutoBuscaById(id: number): Observable<AutoBusca> {
    return this.http.get<AutoBusca>(`${this.baseURL}/${id}`);
  }
}
