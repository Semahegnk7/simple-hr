import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = 'api/employees'; // web api used as end point for employee
  // an api return all employees
  getEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiUrl);
  }

  //get employee by id
  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.apiUrl}/${id}`);
  }
  
  createEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.apiUrl, employee);
  }
  // delete simple employee by id
  deleteEmployee(id:number):Observable<Employee>{
    return this.httpClient.delete<Employee>(`${this.apiUrl}/${id}`);
  }
  //update employee data
updateEmployee(employee:Employee,id:number):Observable<Employee>{

    return this.httpClient.put<Employee>(`${this.apiUrl}/${id}`,employee);
  }

 

}
