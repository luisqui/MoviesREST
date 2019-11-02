import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { NgForm } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: MovieModel = new MovieModel();
  possible = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'new') {
      this.moviesService.getMovie(id)
          .subscribe((resp: MovieModel) => {
            if (resp === undefined){
              this.router.navigate(['/movies']);
            } else {
              this.movie = resp;
            }
          });
    }
  }

  save( form: NgForm) {

    if (form.invalid) {
      // TODO: FORM VALIDATIONS
      console.log('Invalid Form');
      return;
    }

    Swal.fire({
      title: 'Wait',
      text: 'Saving information',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let petition: Observable<any>;
    if (this.movie.id) {
      petition = this.moviesService.updateMovie(this.movie);
    } else {
      this.movie.id =  this.generateID(20, this.possible);
      petition = this.moviesService.createMovie(this.movie);
    }

    petition.subscribe (resp => {
      Swal.fire({
        title: this.movie.name,
        text: 'Updated Successfully',
        type: 'success'
      });
   });

  }

  generateID(length: number, chars: string) {
    let id = '';
    for (let i = length; i > 0; i--) {
        id +=
          chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  }

}
