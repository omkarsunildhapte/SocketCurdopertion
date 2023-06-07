import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private apiUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  addEmplyoyees(employees: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employees);
  }
  deleteEmployee(employeeId: number): Observable<any> {
    const url = `/api/employees/${employeeId}`;
    return this.http.delete(url);
  }

}
