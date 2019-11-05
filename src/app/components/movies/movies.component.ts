import { Component, OnInit} from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieModel } from '../../models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit  {

  movieData: MovieModel[] = [];
  loading = false;
  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
      this.loading = true;

      // Obtains all the movies of the api an then filter that movies leaving only those with the ID property
      this.moviesService.getMovies()
      .subscribe((resp: any) => {
      for (let i = resp.length - 1; i >= 0; i--) {
        if (resp[i].id == null || resp[i].id === '' ) {
          resp.splice( i, 1 );
        }
      }
      this.movieData = resp;
      this.obtainImage();
      this.loading = false;
    });
  }

  // Get petition to the API the movie DB searching by the name of the movie.
  obtainImage() {
    this.movieData.forEach(element => {
      this.moviesService.getMovieImage(element.name).subscribe(resp => {
         element.img = resp;
         //console.log(element);
      });
    });
  }
}
