import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Batch } from '../types/batch';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  baseUrl = 'http://localhost:8080/batch';

  constructor(private httpClient: HttpClient) {}

  addBatch(batch: Batch): Observable<Batch> {
    return this.httpClient.post<Batch>(this.baseUrl, batch);
  }

  getBatches(): Observable<Batch[]> {
    return this.httpClient.get<Batch[]>(this.baseUrl);
  }

  getBatchById(id: number): Observable<Batch> {
    return this.httpClient.get<Batch>(`${this.baseUrl}/${id}`);
  }

  updateBatch(id: number, batch: Batch): Observable<Batch> {
    return this.httpClient.put<Batch>(`${this.baseUrl}/${id}`, batch);
  }

  deleteBatchById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
