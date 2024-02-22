import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salary } from '../models/salary';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = 'api/salary'; // web api used as end point for Salary
  // an api return all Salarys
  getSalary(): Observable<Salary[]> {
    return this.httpClient.get<Salary[]>(this.apiUrl);
  }

  //get Salary by id
  getSalaryById(id: number): Observable<Salary> {
    return this.httpClient.get<Salary>(`${this.apiUrl}/${id}`);
  }
  
  createSalary(salary: Salary): Observable<Salary> {
    return this.httpClient.post<Salary>(this.apiUrl, salary);
  }
  // delete simple Salary by id
  deleteSalary(id:number):Observable<Salary>{
    return this.httpClient.delete<Salary>(`${this.apiUrl}/${id}`);
  }
  updateSalary(salary:Salary,id:number):Observable<Salary>{

    return this.httpClient.put<Salary>(`${this.apiUrl}/${id}`,salary);
  }
}
