import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  public userForm: FormGroup
  public technicalSkills!: FormArray

  constructor(
    private _fb: FormBuilder,
    private service: FormService
  ) {
    this.userForm = this.buildForm()
  }

  ngOnInit(): void {
    this.addTechSkills();
    this.getUserById();
  }
  buildForm() {
    return this._fb.group(
      {
        fullName: [''],
        designation: [''],
        email: [''],
        mobileNumber: [''],
        profile: [''],
        technicalSkills: this._fb.array([]),
        // experience: this._fb.array([this.getExperienceRow()]),
        // education: this._fb.array([this.getEducationRow()]),
      }
    )
  }

  public getUserById() {
    this.service.getUserById().subscribe(res => console.log(res)
    )
  }

  //technical skills
  // getNewTechSkillsRow(): FormGroup {
  //   return this._fb.group({
  //     techSkillName: ["", Validators.required]
  //   });
  // }
  public getTechSkillsArray(data: any): FormArray {
    return this.userForm.controls[data] as FormArray;
  }

  public addTechSkills() {
    // this.technicalSkills = this.userForm.get('technicalSkills') as FormArray;
    // this.technicalSkills.push(this.getNewTechSkillsRow())
    this.getTechSkillsArray('technicalSkills').push(
      this._fb.group({
        techSkillName: [""]
      })
    )
  }

  public deleteSkill(i: number) {
    if (i != 0) {
      this.technicalSkills = this.userForm.get('technicalSkills') as FormArray;
      this.technicalSkills.removeAt(i);
    }
  }


  public onSubmit() {
    this.service.getUserById().subscribe((res => {
      let skills = [];
      skills.push(this.userForm.value)
      let newObj = JSON.parse(JSON.stringify(res))
      if (newObj?.skills) {
        debugger
        newObj?.skills?.push(this.userForm.value)
      } else
        Object.assign(newObj, { skills: skills });

      this.service.editUserObject(newObj).subscribe((res =>
        console.log(res)

      ))
      this.getUserById();
    }))
  }
}
