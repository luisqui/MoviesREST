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

 // Delete the property image added in the object and then update the object in the API, an aux variable is needed
 // to do not modify the model of the movie since everything is passed by reference
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
      .pipe(map((resp: any) => {
        return resp[0];
      }));
 }

  // The delay method is onlymused for you to see the Loading div when the movies are called
  getMovies() {
   return this.http.get(`${this.url}/items`)
          .pipe(delay(100));

 }

 // Here i call the image from the API and some filters are made in case of not finding the image in the first
 // object or if the name of the movie does not exist in the DB, so an string "noimage" is sended to be catched in
 // the pipe "noimage", in the case that the image is found, the data is mapped to send only the information needed. 
 getMovieImage(name: string) {
  return this.http.get(`${this.urlImage}&query=${name}&page=1&include_adult=false`)
        .pipe(
          map((resp: any) => {
            if (!(resp.results.length === 0)) {
              for (let i = 0; i < resp.results.length; i++) {
                if (resp.results[i].poster_path){
                  return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + resp.results[i].poster_path;
                }
              }
            }
            return 'noimage';
          }));
 }

}

