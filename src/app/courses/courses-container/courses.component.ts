import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../model/courses/model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]> | null = null;


  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {
    this.refresh();

  }

  refresh() {
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

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.activatedRoute })
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Deseja excluir esse curso?',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.coursesService.remove(course._id).subscribe({
          next: (success) => {
            this.refresh();
            this.matSnackBar.open('Curso removido com sucesso', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            this.errorDialog('Erro ao remover curso');
            // this.matSnackBar.open('Erro ao remover curso', 'Fechar', { duration: 3000 });
          }
        })

      }
    });
  }

}
