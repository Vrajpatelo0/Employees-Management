import { inject, Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../constants/employees';
import { StorageService } from './storage.service';
import { Employee } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  storageService = inject(StorageService);
  constructor() { }

  addEmployees(data: Employee) { 
    const employees = this.storageService.getItem(STORAGE_KEYS.EMPLOYEES);
    employees.push(data);
    this.storageService.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
  }

  getEmployee(_id: string) {
    const employees = this.storageService.getItem(STORAGE_KEYS.EMPLOYEES);
    return employees.find((employee: Employee) => employee._id === _id);
   }

  getEmployees() {
    return this.storageService.getItem(STORAGE_KEYS.EMPLOYEES);
   }

   deleteEmployee(_id: string) {
    const employees = this.storageService.getItem(STORAGE_KEYS.EMPLOYEES);
    this.storageService.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees.filter((employee: Employee) => employee._id !== _id)));
   }

   editEmployee(_id: string, data: Employee) {
    const employees = this.storageService.getItem(STORAGE_KEYS.EMPLOYEES);
    this.storageService.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees.map((employee: Employee) => employee._id === _id ? data : employee)));
   }

   searchEmployees(searchTerm: string) {
    const employees = this.storageService.getItem(STORAGE_KEYS.EMPLOYEES);
    return employees.filter(
      (employee: Employee) => {
        return employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.mobileNumber?.toString().includes(searchTerm);
      });
   }
}
