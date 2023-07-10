import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../model/courses/model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]>;


  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.courses$ = this.coursesService.list()
      .pipe(
        catchError(error => {
          this.errorDialog('Erro ao carregar cursos')
          return of([]);
        })
      )
  }

  errorDialog(erroMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: erroMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })

  }

}
