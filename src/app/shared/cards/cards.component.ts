import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MovieModel } from '../../models/movie.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  @Input() items: any [] = [];
  constructor( private router: Router, private moviesService: MoviesService) {}

  deleteMovie(movie: MovieModel, i: number) {
    Swal.fire ({
      title: 'Sure?',
      text: `Are you sure you want to delete ${movie.name}?`,
      showConfirmButton: true,
      showCancelButton: true
    }).then (resp => {
       if (resp.value) {
        this.items.splice(i, 1);
        this.moviesService.deleteMovie(movie.id).subscribe();
       }
    });
  }

}
