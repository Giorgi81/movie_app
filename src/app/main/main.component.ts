import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router } from '@angular/router';
import {JsonPipe, NgForOf} from "@angular/common";
import {ApiService} from "../shared/services/api.service";
import {forkJoin} from "rxjs";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgForOf,
    JsonPipe
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  constructor(private Router: Router,
              private _auth: AuthService,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    forkJoin([
      this.apiService.getMovies('popularity'),
      this.apiService.getMovies('revenue'),
      this.apiService.getMovies('original_title'),
      this.apiService.getMovies('release_date')
    ]).subscribe((results: any[]) => {
      this.moviesList1 = results[0].results;
      this.moviesList2 = results[1].results;
      this.moviesList3 = results[2].results;
      this.moviesList4 = results[3].results;

      this.movies = [
        {name: 'Trending Now', movies: [this.moviesList1]},
        {name: 'Popular', movies: [this.moviesList2]},
        {name: 'Action', movies: [this.moviesList3]},
        {name: 'Release Date', movies: [this.moviesList4]}
      ];
    });
  }

  img_path = "https://image.tmdb.org/t/p/w1280";

  title = 'testANG';
  @ViewChild('slider1') slider1!: ElementRef;
  @ViewChild('slider2') slider2!: ElementRef;
  @ViewChild('slider3') slider3!: ElementRef;
  @ViewChild('slider4') slider4!: ElementRef;
  @ViewChild('slider5') slider5!: ElementRef;

  moviesList1: any[] = [];
  moviesList2: any[] = [];
  moviesList3: any[] = [];
  moviesList4: any[] = [];
  movies: any[] = []
  scrollAmount = 250;

  scrollLeft(sliderId: string) {
    const slider = document.getElementById(sliderId);
    if (slider) {
      slider.scrollLeft -= 200;
    }
  }

  scrollRight(sliderId: string) {
    const slider = document.getElementById(sliderId);
    if (slider) {
      slider.scrollLeft += 200;
    }
  }

  private getSliderElement(sliderName: string): HTMLElement | null {
    switch (sliderName) {
      case 'slider1':
        return this.slider1.nativeElement;
      case 'slider2':
        return this.slider2.nativeElement;
      case 'slider3':
        return this.slider3.nativeElement;
      case 'slider4':
        return this.slider4.nativeElement;
      case 'slider5':
        return this.slider5.nativeElement;
      default:
        return null;
    }
  }

  private smoothScroll(element: HTMLElement, to: number): void {
    const duration = 500;
    const start = element.scrollLeft;
    const startTime = performance.now();

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      element.scrollLeft = start + (to - start) * progress;

      if (elapsed < duration) {
        requestAnimationFrame(scroll);
      }
    };
    requestAnimationFrame(scroll);
  }

  logOut() {
    this._auth.logOut();
    this.Router.navigate(['/login'])

  }

  logoBtn() {
    this.Router.navigate(['/main'])
  }
}
