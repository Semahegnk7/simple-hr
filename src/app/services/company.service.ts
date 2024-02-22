import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = 'api/company'; // web api used as end point for company

  // an api return all Company
  getCompany(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.apiUrl);
  }
  createCompany(data: Company): Observable<Company> {
    return this.httpClient.post<Company>(this.apiUrl, data);
  }
 //update Company data
 
 updateCompany(data:Company,id:number):Observable<Company>{

  return this.httpClient.put<Company>(`${this.apiUrl}/${id}`,data);
} 
  //get Company by id
  getCompanyById(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.apiUrl}/${id}`);
  }
  
  
  // delete simple Company by id
  deleteCompany(id:number):Observable<Company>{
    return this.httpClient.delete<Company>(`${this.apiUrl}/${id}`);
  }
 
}