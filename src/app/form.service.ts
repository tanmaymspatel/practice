import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private api: string
  constructor(
    private http: HttpClient
  ) {
    this.api = environment.baseURL;
  }

  public getUserById() {
    return this.http.get(`${this.api}/users/1`)
  }

  public addUser(data: any) {
    return this.http.post(`${this.api}/users/1`, data)
  }

  public editUserObject(data: any) {
    return this.http.put(`${this.api}/users/1`, data)
  }

  ///////////////////////////  tesk container  ///////////////////////////////

  public getSatus() {
    return this.http.get(`${this.api}/status`)
  }
  public getPriority() {
    return this.http.get(`${this.api}/priority`)
  }

  getProjectById() {
    return this.http.get(`${this.api}/project/1`)
  }

  editProjectDetailsById(data: any) {
    return this.http.put(`${this.api}/project/1`, data)
  }

}

