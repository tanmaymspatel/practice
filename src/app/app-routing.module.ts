import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { TaskContainerComponent } from './task-container/task-container.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'task-list', pathMatch: 'full'
  },
  {
    path: 'form', component: DynamicFormComponent
  },
  {
    path: 'task-list', component: TaskContainerComponent
  },
  {
    path: '**', redirectTo: 'form', pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
