import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private readonly http: HttpClient) {}

  public getFile() {
    return this.http.get('http://localhost:3000/themes.txt', {
      responseType: 'text',
    });
  }
}
