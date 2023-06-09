import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private apiUrl = 'http://localhost:3000/api/employees';
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');
  }

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.delete(url);
  }

  updateEmployee(employeeId: number, updatedEmployee: any): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.put(url, updatedEmployee);
  }

  getRealTimeData(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('data', (data) => {
        observer.next(data);
      });
    });
  }

  emitGetDataEvent(): void {
    this.socket.emit('get-data');
  }
}
