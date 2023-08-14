import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Course } from '../model/courses/model/course';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root'
})

export class CourseResolver implements Resolve<Course> {

  constructor(private courseService: CoursesService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    if (route.params && route.params['id']) {
      return this.courseService.loadById(route.params['id'])
    }
    return of({ _id: '', name: '', category: '' });
  }
}
