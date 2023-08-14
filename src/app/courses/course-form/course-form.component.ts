import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/courses/model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: ['', [Validators.required]]
  })

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const course: Course = this.activatedRoute.snapshot.data['course']
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }

  public onSubmit() {
    if (this.form.valid) {
      this.coursesService.save(this.form.value)
        .subscribe({
          next: (success) => { this.onSuccess() },
          error: (error) => { this.onError() }
        })
    }
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

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName)

    if (field?.hasError('required')) {
      return 'Campo obrigatório!'
    }

    if (field?.hasError('minlength')) {
      const required: number = field.errors ? field.errors['minlength']['requiredLength'] : 5
      return 'Tamanho mínimo de ' + required + ' caracteres'
    }

    if (field?.hasError('maxlength')) {
      const required: number = field.errors ? field.errors['maxlength']['requiredLength'] : 5
      return 'Tamanho máximo de ' + required + ' caracteres'
    }

    return 'Campo inválido!'

  }

}
