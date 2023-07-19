import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private api_url = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}

  public uploadFile(file: File | null) {
    const formData = new FormData();
    formData.append('image', file!);

    return this.http.post<{ imageUrl: string }>(
      `${this.api_url}/upload`,
      formData
    );
  }
}
