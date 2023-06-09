import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
export class TableComponentComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private employeeService: SocketIoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getEmployees();

    setInterval(() => {
      this.getEmployees();
    }, 1000);
  }
  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      data => {
        this.employees = data;
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee.id).subscribe(
      () => {
        console.log('Employee deleted successfully.');
        this.employees = this.employees.filter(e => e.id !== employee.id);
      },
      error => {
        console.error('Error deleting employee:', error);
      }
    );
  }
  editEmployee(employee: any) {
    const dialogRef = this.dialog.open(EditDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        debugger
        this.employeeService.updateEmployee(employee.id, result).subscribe(

          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        )
      }


    });
  }
}
