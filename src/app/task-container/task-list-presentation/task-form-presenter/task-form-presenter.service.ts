import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class TaskFormPresenterService {

  public newData$: Observable<any>
  private _newData: Subject<any>

  constructor(
    private _fb: FormBuilder
  ) {
    this._newData = new Subject()
    this.newData$ = new Observable()
    this.newData$ = this._newData.asObservable()
  }

  public buildForm() {
    return this._fb.group({
      taskName: [""],
      status: [""],
      priority: [""]
    })
  }

  public onSubmit(newData: any) {
    if (!newData.valid) {
      return
    } else this._newData.next(newData.value)
  }
}
