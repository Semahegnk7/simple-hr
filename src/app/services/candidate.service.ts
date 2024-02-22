import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private httpClient: HttpClient) {}

  apiUrl = 'api/candidates'; // web api used as end point for candidate
  // an api return all candidates
  getCandidates(): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(this.apiUrl);
  }

  //get Candidate by id
  getCandidateById(id: number): Observable<Candidate> {
    return this.httpClient.get<Candidate>(`${this.apiUrl}/${id}`);
  }
  
  createCandidate(candidate: Candidate): Observable<Candidate> {
    return this.httpClient.post<Candidate>(this.apiUrl, candidate);
  }
  // delete simple Candidate by id
  deleteCandidate(id:number):Observable<Candidate>{
    return this.httpClient.delete<Candidate>(`${this.apiUrl}/${id}`);
  }
  updateCandidate(candidate:Candidate,id:number):Observable<Candidate>{

    return this.httpClient.put<Candidate>(`${this.apiUrl}/${id}`,candidate);
  }
}
