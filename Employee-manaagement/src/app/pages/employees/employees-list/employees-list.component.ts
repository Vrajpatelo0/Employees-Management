import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { StorageService } from '../../../core/services/storage.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employees-list',
  imports: [MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['name', 'email','mobileNumber', 'actions'];

  employeesList = new MatTableDataSource<any>([]);
  private storageService = inject(StorageService);
  private employeeService = inject(EmployeeService);
  private route = inject(Router);
  searchText = signal<string>('');
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    console.log(this.employeeService.getEmployees());
    this.employeesList = new MatTableDataSource(this.employeeService.getEmployees() || []);
  }

  ngAfterViewInit() {
    this.employeesList.paginator = this.paginator;
  }

  addEmployee() {
    this.route.navigate(['employees/add']);
  }

  editEmployee(row: any) {
    console.log(row)
    this.route.navigate(['employees/add'], { queryParams: {id: row?._id} });
  }

  deleteEmployee(row: any) {
    this.employeeService.deleteEmployee(row?._id as string);
    this.resetTable();
  }

  resetTable(){
    this.employeesList = new MatTableDataSource(this.employeeService.getEmployees() || []);
    this.employeesList.paginator = this.paginator;
  }

  onSearch() {
    console.log(this.searchText());
    this.employeesList = new MatTableDataSource(this.employeeService.searchEmployees(this.searchText()) || []);
    this.employeesList.paginator = this.paginator;
  }
}
