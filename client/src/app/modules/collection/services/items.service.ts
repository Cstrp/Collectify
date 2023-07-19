import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Items } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private readonly url = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}

  public getItems(): Observable<Items[]> {
    return this.http.get<Items[]>(`${this.url}/item/all`);
  }

  public getItem(id: string): Observable<Items> {
    return this.http.get<Items>(`${this.url}/item/${id}`);
  }

  public createItem(collectionId: string, item: Items): Observable<Items> {
    return this.http.post<Items>(
      `${this.url}/item/create?collectionId=${collectionId}`,
      item
    );
  }

  public updateItem(id: string, item: Items): Observable<Items> {
    return this.http.put<Items>(`${this.url}/item/update/${id}`, item);
  }

  public deleteItem(id: string): Observable<Items> {
    return this.http.delete<Items>(`${this.url}/item/delete/${id}`);
  }
}
