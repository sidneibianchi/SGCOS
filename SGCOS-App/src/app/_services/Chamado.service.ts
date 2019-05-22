import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chamado } from '../_models/Chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  baseURL = 'http://localhost:5000/api/chamado';

constructor(private http: HttpClient) { }

getAllChamado(): Observable<Chamado[]> {
  return this.http.get<Chamado[]>(this.baseURL);
}

getChamadoById(id: number): Observable<Chamado> {
  return this.http.get<Chamado>(`${this.baseURL}/${id}`);
}

getChamadoByNome(nome: string): Observable<Chamado> {
  return this.http.get<Chamado>(`${this.baseURL}/${nome}`);
}

postChamado(chamado: Chamado) {
  return this.http.post(this.baseURL, chamado);
}

putChamado(chamado: Chamado) {
  return this.http.put(`${this.baseURL}/${chamado.id}`, chamado);
}

deleteChamado(id: number) {
  return this.http.delete(`${this.baseURL}/${id}`);
}
}
