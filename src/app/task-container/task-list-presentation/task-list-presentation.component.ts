import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskListPresenterService } from '../task-list-presenter/task-list-presenter.service';

@Component({
  selector: 'app-task-list-presentation',
  templateUrl: './task-list-presentation.component.html',
  styleUrls: ['./task-list-presentation.component.scss'],
  viewProviders: [TaskListPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListPresentationComponent implements OnInit {

  @Output() public editedProjectDetails: EventEmitter<any> = new EventEmitter();

  // project details by id

  private _projectDetails !: any;
  public get projectDetails(): any {
    return this._projectDetails;
  }
  @Input() public set projectDetails(data: any) {
    if (data) {
      this._projectDetails = data;
      this.todoList = this._projectDetails?.todoList
      this.activeList = this._projectDetails?.activeList
      this.completedList = this._projectDetails?.completedList
      console.log(this._projectDetails);
    }
  }


  // status
  private _statusList !: any;
  public get statusList(): any {
    return this._statusList;
  }
  @Input() public set statusList(list: any) {
    if (list) {
      this._statusList = list;
    }
  }

  // priority

  private _prioriyList !: any;
  public get prioriyList(): any {
    return this._prioriyList;
  }
  @Input() public set prioriyList(newlist: any) {
    if (newlist) {
      this._prioriyList = newlist;
    }
  }


  public todoList!: any;
  public activeList!: any;
  public completedList!: any;

  constructor(
    private _taskListPresenterService: TaskListPresenterService,
  ) {

  }

  ngOnInit(): void {
    this.emitEditedProjectData();
  }

  public openTaskForm() {
    this._taskListPresenterService.openTaskFormOverlay(this._prioriyList, this._statusList, this._projectDetails);
  }

  public emitEditedProjectData() {
    this._taskListPresenterService.newData$.subscribe(details => {
      this._projectDetails = details;
      this.editedProjectDetails.emit(details);
    })
  }
}
