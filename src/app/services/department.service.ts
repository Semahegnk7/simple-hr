import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClient: HttpClient) {}

  apiUrl = 'api/departments'; // web api used as end point for department
  // an api return all departments
  getDepartment(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.apiUrl);
  }

  //get department by id
  getDepartmentById(id: number): Observable<Department> {
    return this.httpClient.get<Department>(`${this.apiUrl}/${id}`);
  }
  getDepartmentByCompanyI(id: string): Observable<Department> {
    return this.httpClient.get<Department>(`${this.apiUrl}/${id}`);
  }
  
  createDepartment(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(this.apiUrl, department);
  }
  // delete simple department by id
  deleteDepartment(id:number):Observable<Department>{
    return this.httpClient.delete<Department>(`${this.apiUrl}/${id}`);
  }
  updateDepartment(department:Department,id:number):Observable<Department>{

    return this.httpClient.put<Department>(`${this.apiUrl}/${id}`,department);
  }
}
