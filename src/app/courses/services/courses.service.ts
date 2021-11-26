import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Course } from '../model/courses/model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = './assets/cursos.json'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(),
        // delay(3000),
        tap(courses => console.log(courses)))
  }
}
