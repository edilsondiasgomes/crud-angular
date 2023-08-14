import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../model/courses/model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  @Input() courses: any
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();

  displayedColumns = ['_id', 'name', 'category', 'actions'];

  ngOnInit(): void {
    return
  }

  onEdit(course: Course) {
    this.edit.emit(course)
  }

  onRemove(course: Course) {
    this.remove.emit(course)

  }

}
