import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { TaskFormPresentationComponent } from '../task-list-presentation/task-form-presentation/task-form-presentation.component';

@Injectable()
export class TaskListPresenterService {
  public newData$: Observable<any>;
  private _newData: Subject<any>

  constructor(
    private _overlay: Overlay
  ) {
    this._newData = new Subject()
    this.newData$ = new Observable()
    this.newData$ = this._newData.asObservable()
  }

  public openTaskFormOverlay(priorityList?: any, statusList?: any, projectDetails?: any,) {
    const OverlayRef = this._overlay.create({
      hasBackdrop: true,
      positionStrategy: this._overlay.position().global().centerVertically().centerHorizontally(),
    });

    const component = new ComponentPortal(TaskFormPresentationComponent);
    const componentRef = OverlayRef.attach(component);

    OverlayRef.backdropClick().subscribe(() => OverlayRef.detach())

    // priority and status list to the task form - craeting instances

    componentRef.instance.priorityList = priorityList;
    componentRef.instance.statusList = statusList;

    //on clicking on cancel button
    componentRef.instance.cancelClick.subscribe(() => OverlayRef.detach())

    // new data 
    componentRef.instance.newData.subscribe((newData) => {
      newData.completedSubTasks = [];
      newData.totalSubTasks = [];
      console.log(newData);
      if (newData.status === "todo") {
        projectDetails?.todoList.push(newData)
        console.log(projectDetails);
      } else if (newData.status === "active") {
        projectDetails?.activeList.push(newData)
        console.log(projectDetails);
      } else if (newData.status === "completed") {
        projectDetails?.completedList.push(newData)
        console.log(projectDetails);
      }
      this._newData.next(projectDetails);
      OverlayRef.detach();
    })

  }


}