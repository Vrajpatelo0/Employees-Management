import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    },
    {
        path: 'employees',
        loadComponent: () => import('./pages/employees/employees.component').then(m => m.EmployeesComponent),
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
            {
                path: 'list',
                loadComponent: () => import('./pages/employees/employees-list/employees-list.component').then(m => m.EmployeesListComponent)
            },
            {
                path: 'add',
                loadComponent: () => import('./pages/employees/employees-add/employees-add.component').then(m => m.EmployeesAddComponent)
            },
            {
                path: ':id',
                loadComponent: () => import('./pages/employees/employee-details/employee-details.component').then(m => m.EmployeeDetailsComponent)
            }
        ]
    },
    { path: '', pathMatch: 'full', redirectTo: 'employees' },
];
