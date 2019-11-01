import { Component} from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieModel } from '../../models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent  {
  
  movieData: MovieModel[] = [];
  constructor(private movies: MoviesService) {
    
    this.movies.getMovies().subscribe((resp: any) =>{
      for (let i = resp.length - 1; i >= 0; i--) {
        if (resp[i].id == null || resp[i].id == "" ){
          resp.splice( i, 1 );
        }
      }
      this.movieData = resp;
      this.obtenerImagen();
      console.log(resp);
    });
   
   

  }

  obtenerImagen(){
    console.log('entre aqui');
    this.movieData.forEach(element => {
      this.movies.getMovieImage(element.name).subscribe(resp => {
         element.img = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+resp[0].poster_path;
         console.log(element.img);
      });
    });
  }
}
