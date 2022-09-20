import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from "@angular/cdk/overlay";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskListPresentationComponent } from './task-container/task-list-presentation/task-list-presentation.component';
import { TaskFormPresentationComponent } from './task-container/task-list-presentation/task-form-presentation/task-form-presentation.component';
import { PriorityPipe } from './pipes/priority.pipe';
import { StatusPipe } from './pipes/status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    TaskContainerComponent,
    TaskListPresentationComponent,
    TaskFormPresentationComponent,
    PriorityPipe,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
