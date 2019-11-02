import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieModel } from '../models/movie.model';
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = 'http://35.232.123.59:4000';
  private urlImage = 'https://api.themoviedb.org/3/search/movie?api_key=f0a3ad0442476101dd28cbbade8db22d&language=en-US';

  constructor(private http: HttpClient) {}


  createMovie(movie: MovieModel) {

    return this.http.post(`${this.url}/items`, movie);
 }

  updateMovie( movie: MovieModel) {

   const movieTemp = {
     ...movie
   };

   delete movieTemp.img;
   return this.http.put(`${this.url}/items/${movie.id}`, movieTemp);
 }

  deleteMovie(id: string) {

     return this.http.delete (`${this.url}/items/${id}`);
 }

  getMovie(id: string) {
   return this.http.get (`${this.url}/items/${id}`)
      .pipe(map((resp: any) =>{
        return resp[0];
      }));
 }


  getMovies() {
   return this.http.get(`${this.url}/items`)
          .pipe(delay(100));

 }

 getMovieImage(name: string) {
  return this.http.get(`${this.urlImage}&query=${name}&page=1&include_adult=false`)
        .pipe(
          map((resp:any) => {
            if (resp.results[0].poster_path){
              return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + resp.results[0].poster_path;
            } else {
              return null;
            }
          }));
 }

}

