import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuscaCEPService {
constructor(private http: HttpClient) { }

  buscaBep(cep: string) {
    return this.http.get(`http://viacep.com.br/ws/${cep}/json/`)
        .toPromise()
        .then( response => {
          console.log(response);
        });
  }
}
