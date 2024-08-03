import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getMovies(option:string){
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?sort_by=${option}.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`)
  }


}
