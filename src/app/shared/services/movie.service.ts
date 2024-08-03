import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/discover/movie';
  private apiKey = '725ce5437b2bdd4cb8f63c35bbd275e0';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    const url = `${this.apiUrl}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${this.apiKey}`;
    return this.http.get(url);
  }
}
