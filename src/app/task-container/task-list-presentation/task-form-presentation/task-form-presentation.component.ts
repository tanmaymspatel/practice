import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TaskFormPresenterService } from '../task-form-presenter/task-form-presenter.service';

@Component({
  selector: 'app-task-form-presentation',
  templateUrl: './task-form-presentation.component.html',
  styleUrls: ['./task-form-presentation.component.scss'],
  viewProviders: [TaskFormPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormPresentationComponent implements OnInit {

  public taskForm: FormGroup;
  public formTitle: string;
  @Output() public cancelClick: EventEmitter<number> = new EventEmitter();
  @Output() public newData: EventEmitter<any> = new EventEmitter();

  /// data from overlay service in list presenter
  private _priorityList !: any;
  public get priorityList(): any {
    return this._priorityList;
  }
  @Input() public set priorityList(v: any) {
    if (v) {
      this._priorityList = v;
    }
  }

  /// data from overlay service in list presenter

  private _statusList: any;
  public get statusList(): any {
    return this._statusList;
  }
  public set statusList(list: any) {
    if (list) {
      this._statusList = list;
    }
  }



  constructor(
    private _formPresenter: TaskFormPresenterService
  ) {
    this.taskForm = this._formPresenter.buildForm();
    this.formTitle = "Add Task"
  }

  ngOnInit(): void {
    this.emitData();
  }

  public onCancel() {
    this.cancelClick.emit();
  }

  public onSubmit() {
    this._formPresenter.onSubmit(this.taskForm)
  }

  public emitData() {
    this._formPresenter.newData$.subscribe(newData => this.newData.emit(newData))
  }
}
