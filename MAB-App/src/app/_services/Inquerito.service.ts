import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inquerito } from '../_models/Inquerito';

@Injectable({
  providedIn: 'root'
})
export class InqueritoService {
  baseURL = 'http://localhost:5000/api/inquerito';

  constructor(private http: HttpClient) { }

  getAllInquerito(): Observable<Inquerito[]> {
    return this.http.get<Inquerito[]>(this.baseURL);
  }

  getInqueritoById(id: number): Observable<Inquerito> {
    return this.http.get<Inquerito>(`${this.baseURL}/${id}`);
  }

  postInquerito(inquerito: Inquerito) {
    return this.http.post(this.baseURL, inquerito);
  }

  putInquerito(inquerito: Inquerito) {
    return this.http.put(`${this.baseURL}/${inquerito.id}`, inquerito);
  }

  deleteInquerito(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
