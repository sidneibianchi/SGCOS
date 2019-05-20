import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../_models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseURL = 'http://localhost:5000/api/cliente';

constructor(private http: HttpClient) { }

getAllCliente(): Observable<Cliente[]> {
  return this.http.get<Cliente[]>(this.baseURL);
}

getClienteById(id: number): Observable<Cliente> {
  return this.http.get<Cliente>(`${this.baseURL}/${id}`);
}

getClienteByNome(nome: string): Observable<Cliente> {
  return this.http.get<Cliente>(`${this.baseURL}/${nome}`);
}

postCliente(cliente: Cliente) {
  return this.http.post(this.baseURL, cliente);
}

putCliente(cliente: Cliente) {
  return this.http.put(`${this.baseURL}/${cliente.id}`, cliente);
}

deleteCliente(id: number) {
  return this.http.delete(`${this.baseURL}/${id}`);
}

}
