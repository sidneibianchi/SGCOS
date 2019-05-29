import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from '../_models/Servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  baseURL = 'http://localhost:5000/api/servico';

  constructor(private http: HttpClient) { }

  getAllServico(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.baseURL);
  }

  getServicoById(id: number): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.baseURL}/${id}`);
  }

  getServicoByEquipamento(idEquipamento: string): Observable<Servico[]> {
    return this.http.get<Servico[]>(`${this.baseURL}/getByEquipamento/${idEquipamento}`);
  }

  postServico(servico: Servico) {
    return this.http.post(this.baseURL, servico);
  }

  putServico(servico: Servico) {
    return this.http.put(`${this.baseURL}/${servico.id}`, servico);
  }

  deleteServico(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
