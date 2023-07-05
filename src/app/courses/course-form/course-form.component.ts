import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    })
  }

  ngOnInit(): void {
    return
  }

  public onSubmit() {
    this.coursesService.save(this.form.value)
      .subscribe({
        next: (success) => { this.onSuccess() },
        error: (error) => { this.onError() }
      })
  }

  public onCancel() {
    this.location.back();
    // this.router.navigate([''], { relativeTo: this.activatedRoute })
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso', 'Fechar', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso', 'Fechar', { duration: 3000 })

  }



}
