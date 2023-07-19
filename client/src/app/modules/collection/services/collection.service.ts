import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collection } from '../interfaces';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  #api_url = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public getCollections() {
    return this.http.get<Collection[]>(`${this.#api_url}/collections`);
  }

  public getCollection(id: string) {
    return this.http.get<Collection>(`${this.#api_url}/collections/${id}`);
  }

  public createCollection(collection: Collection) {
    return this.http.post<Collection>(
      `${this.#api_url}/collections/create`,
      collection
    );
  }

  public updateCollection(id: string, collection: Collection) {
    return this.http.put<Collection>(
      `${this.#api_url}/collections/update/${id}`,
      collection
    );
  }

  public removeCollection(id: string) {
    return this.http.delete(`${this.#api_url}/collections/${id}`);
  }
}
