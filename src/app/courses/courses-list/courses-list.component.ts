import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: any
  displayedColumns = ['_id', 'name', 'category', 'actions'];

  constructor() { }

  ngOnInit(): void {
    return
  }

}
