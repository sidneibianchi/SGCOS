import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../_models/Cliente';
import { Endereco } from '../_models/Endereco';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseURL = 'https://sgcos.azurewebsites.net/api/cliente';


  resultado: Endereco;
  cep: Endereco;

  constructor(private http: HttpClient) { }

  getAllCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseURL);
  }

  buscarCep(cep: string) {

    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe(data => this.resultado = this.converterRespostaParaCep(data));
  }

  private converterRespostaParaCep(cepNaResposta): Endereco {
    this.cep.id = 0;
    this.cep.cep = cepNaResposta.cep;
    this.cep.logradouro = cepNaResposta.logradouro;
    this.cep.bairro = cepNaResposta.bairro;
    this.cep.cidade = cepNaResposta.localidade;
    this.cep.uf = cepNaResposta.uf;
    return this.cep;
}

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseURL}/${id}`);
  }

  getClienteByNome(nome: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseURL}/${nome}`);
  }

  getClienteByIdCpfCnpj(cpfCnpj: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseURL}/${cpfCnpj}`);
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
