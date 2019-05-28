import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipamento } from '../_models/Equipamento';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {
  baseURL = 'http://localhost:5000/api/equipamento';

  constructor(private http: HttpClient) { }

  getAllEquipamento(): Observable<Equipamento[]> {
    return this.http.get<Equipamento[]>(this.baseURL);
  }

  getEquipamentoById(id: number): Observable<Equipamento> {
    return this.http.get<Equipamento>(`${this.baseURL}/${id}`);
  }

  getEquipamentoBynrSerie(nrSerie: string): Observable<Equipamento> {
    return this.http.get<Equipamento>(`${this.baseURL}/${nrSerie}`);
  }

  postEquipamento(equipamento: Equipamento) {
    return this.http.post(this.baseURL, equipamento);
  }

  putEquipamento(equipamento: Equipamento) {
    return this.http.put(`${this.baseURL}/${equipamento.id}`, equipamento);
  }

  deleteEquipamento(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
