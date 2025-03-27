import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/user.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { min } from 'rxjs';

@Component({
  selector: 'app-employees-add',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, RouterLink],
  templateUrl: './employees-add.component.html',
  styleUrl: './employees-add.component.scss'
})
export class EmployeesAddComponent implements OnInit {

  id = signal<string | null>(null)
  employeeForm!: FormGroup
  route = inject(Router);
  employeeService = inject(EmployeeService);
  activateRoute = inject(ActivatedRoute);
  isEmployeeExist = signal<boolean>(false);
  ngOnInit(): void {
    this.initForm();
    this.id.set(this.activateRoute.snapshot.queryParams?.id)

    if(this.id()) {
      const employee = this.employeeService.getEmployee(this.id() as string);
      this.isEmployeeExist.set(!!employee);
      console.log(employee);
      this.employeeForm.patchValue(employee);
    }
  }

  initForm() {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      profileImage: new FormControl(''),
      mobileNumber: new FormControl(0, [Validators.required]),
    })
  }

  onSubmit() {
    if(this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return
    }
    console.log(this.employeeForm.value)
    this.id() ? this.editEmployee() : this.addEmployee();
  }

  addEmployee() {
    const employeeData: Employee = {
      ...this.employeeForm.value,
      _id: window.crypto.randomUUID()
    }
    this.employeeService.addEmployees(employeeData);
    this.employeeForm.reset();
    this.route.navigate(['employees/list']);
  }

  editEmployee() {
    this.employeeService.editEmployee(this.id() as string, { ...this.employeeForm.value , _id: this.id() });
    this.route.navigate(['employees/list']);
  }

  get formControls () {
    return this.employeeForm.controls;
  }
}
