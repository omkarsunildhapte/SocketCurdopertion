import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DilogComponent } from '../dilog/dilog.component';
import { SocketIoService } from '../socket-io.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  result: any;

  constructor(private dialog: MatDialog, private employeeService: SocketIoService) { }



  openDialog(): void {
    const dialogRef = this.dialog.open(DilogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        debugger
        this.employeeService.addEmployee(result).subscribe(
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
