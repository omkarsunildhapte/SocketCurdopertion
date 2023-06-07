import { Component } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { Subscription } from 'rxjs';
interface Employee {
  id: number;
  name: string;
  email: string;
}
@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent {
  employees!: Employee[];

  constructor(private employeeService: SocketIoService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(
      data => {
        this.employees = data;
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }
}