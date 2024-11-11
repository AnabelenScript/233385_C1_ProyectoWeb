import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shoe } from './shoeInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoeService {
  private readonly apiUrl = 'https://54.156.54.129/zapatos';

  constructor(private http: HttpClient) {}

  getShoes(): Observable<Shoe[]> {
    return this.http.get<Shoe[]>(this.apiUrl);
  }

  addShoe(shoe: Shoe): Observable<Shoe> {
    return this.http.post<Shoe>(this.apiUrl, shoe);
  }

  updateShoe(shoe: Shoe): Observable<Shoe> {
    return this.http.put<Shoe>(`${this.apiUrl}/${shoe.id}`, shoe);
  }

  deleteShoe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
