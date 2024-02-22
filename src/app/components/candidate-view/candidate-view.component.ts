import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-candidate-view',
  templateUrl: './candidate-view.component.html',
  styleUrls: ['./candidate-view.component.scss']
})
export class CandidateViewComponent implements AfterViewInit {
  candidates: Candidate[] = [];
  id: number;
  deletedId:number
  registrationForm: FormGroup;
  deleteModal: any;
  displayedColumns: string[] = [
    'id',
    'fname',
    'lname',
    'address',
    'email',
    'phone',
    'education',
    'company',
    'status',
    'dob',//date of birth
    'actions',
  ];
  dataSource = new MatTableDataSource<Candidate>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private service: CandidateService, private router: Router,private compService:CompanyService) {
    this.url = this.router.url;
  }
  url: any;
lengths:number;
  ngAfterViewInit() {
    this.getcandidates();
  }
  getcandidates() {
    this.service.getCandidates().subscribe((resp) => {
      this.dataSource.data = resp;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.lengths=this.dataSource.data.length;
    });
  }
  setEditId(id){
    sessionStorage.setItem("candidateId",id);
    this.router.navigate(['/addCandidate']);
  }
  setId(id:any){
    this.deletedId=id;
  }
 
  deleteCandidate(){
    this.service.deleteCandidate(this.deletedId).subscribe(resp=>{
      this.getcandidates();
    })
  }
  getCompanyById(len:number){
        for(let i=0;i<len;i++){
       this.compService.getCompanyById(this.dataSource.data[i].id).subscribe((resp)=>{
        this.dataSource.data[i].resume=resp.companyName;

       });
    }
    
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
