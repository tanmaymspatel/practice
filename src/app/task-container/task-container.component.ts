import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormService } from '../form.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent implements OnInit {
  public statusList: Observable<any>;
  public priorityList: Observable<any>;
  public projectDetails: Observable<any>;

  constructor(
    private formService: FormService
  ) {
    this.statusList = new Observable();
    this.priorityList = new Observable();
    this.projectDetails = new Observable();
  }

  ngOnInit(): void {
    this.getProritylist();
    this.getProjectById();
    this.getStatusList();
  }

  getProritylist() {
    this.priorityList = this.formService.getPriority();
  }

  getStatusList() {
    this.statusList = this.formService.getSatus();
  }

  getProjectById() {
    this.projectDetails = this.formService.getProjectById();
  }

  editedProjectDetails(data: any) {
    this.formService.editProjectDetailsById(data).subscribe((res) => {
      alert("Project Edited")
    }, (error) => {
      alert("Something Went Wrong")
      console.log(error);
    });
  }
}
