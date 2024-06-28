import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Intern } from '../types/intern';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InternService {
  baseUrl = 'http://localhost:8080/intern';

  constructor(private httpClient: HttpClient) {}

  addIntern(intern: Partial<Intern>): Observable<Intern> {
    return this.httpClient.post<Intern>(this.baseUrl, intern);
  }

  getInterns(): Observable<Intern[]> {
    return this.httpClient.get<Intern[]>(this.baseUrl);
  }

  getInternById(id: number): Observable<Intern> {
    return this.httpClient.get<Intern>(`${this.baseUrl}/${id}`);
  }

  updateIntern(id: number, intern: Intern): Observable<Intern> {
    return this.httpClient.put<Intern>(`${this.baseUrl}/${id}`, intern);
  }

  deleteInternById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
