import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
import { Employee } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  storageService = inject(StorageService);
 ngOnInit(): void {
   this.addMockUserData();
 }

 addMockUserData() {
   const mockData: Employee[] = [];
    this.storageService.setItem('employees', JSON.stringify(mockData));
 }
}
