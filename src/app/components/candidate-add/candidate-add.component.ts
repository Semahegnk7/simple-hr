import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/models/candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-candidate-add',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.scss'],
})
export class CandidateAddComponent implements OnInit {
  dataSource = new MatTableDataSource<Candidate>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  registrationForm: FormGroup;
  isSuccess: boolean = false;
  id: number;
  data: any;
  update: boolean = false;
  constructor(
    private router: Router,
    private service: CandidateService,
    private formBuilder: FormBuilder,
    private compService: CompanyService
  ) {}
  ngOnInit(): void {
    this.setEditedData();
    this.getLastId();
    this.getCompany();
    this.registrationForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      resume: ['', Validators.required],
      status: ['', Validators.required],
      phone: ['', Validators.required],
      education: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      company: ['', ],
    });
  }
  reset() {
    this.registrationForm.reset();
  }
  setEditedData() {
    this.id = parseInt(sessionStorage.getItem('candidateId'));
    sessionStorage.removeItem('candidateId');

    if (this.id) {
      this.update = true;
      this.service.getCandidateById(this.id).subscribe((resp) => {
        this.data = resp;

        this.registrationForm.controls['fname'].setValue(this.data.firstName);
        this.registrationForm.controls['lname'].setValue(this.data.lastName);
        this.registrationForm.controls['email'].setValue(this.data.email);
        this.registrationForm.controls['phone'].setValue(this.data.phone);
        this.registrationForm.controls['address'].setValue(this.data.address);
         this.registrationForm.controls['education'].setValue(this.data.education);
         this.registrationForm.controls['resume'].setValue(this.data.resume);
        this.registrationForm.controls['company'].setValue(this.data.company);
        this.registrationForm.controls['status'].setValue(this.data.status);
        this.registrationForm.controls['dob'].setValue(this.data.dateOfBirth);
      });
    }
  }
  updateInfo() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value.name);
      const data: Candidate = {
        id: this.id,
        firstName: this.registrationForm.value.fname,
        email: this.registrationForm.value.email,
        education: this.registrationForm.value.education,
        dateOfBirth: this.registrationForm.value.dob,
        phone: this.registrationForm.value.phone,
        resume: this.registrationForm.value.resume,
        status: this.registrationForm.value.status,
        lastName: this.registrationForm.value.lastName,
        address: this.registrationForm.value.address,
        company:this.registrationForm.value.company
      };
      this.service.updateCandidate(data, this.id).subscribe((resp) => {
        this.update = false;
        alert('SuccessFull');
      });
    } else {
      alert('Some Thing went wrong!!!');
    }
  }

  addNew() {
    if (this.registrationForm.valid) {
      this.getLastId();
      this.lastId++;
      const data: Candidate = {
        id: this.lastId,
        firstName: this.registrationForm.value.fname,
        email: this.registrationForm.value.email,
        education: this.registrationForm.value.education,
        dateOfBirth: this.registrationForm.value.dob,
        phone: this.registrationForm.value.phone,
        resume: this.registrationForm.value.resume,
        status: this.registrationForm.value.status,
        lastName: this.registrationForm.value.lname,
        address: this.registrationForm.value.address,
        company:this.registrationForm.value.company,
      };
      this.service.createCandidate(data).subscribe((resp) => {
        console.log(data);
        alert('SuccessFull');
      });
    } else {
      alert('Something went wrong');
    }
  }
  companyData: any;
  companyName: any[] = [];
  cLength: number;
  getCompany() {
    this.compService.getCompany().subscribe((resp) => {
      this.companyData = resp;
      this.cLength = resp.length;
      for (let i = 0; i < this.cLength; i++) {
        this.companyName.push(resp[i].companyName);
      }
     
    });
    
  }
  lastId: any;
  totalData: any;
  getLastId() {
    // Id Auto Increment
    this.service.getCandidates().subscribe((resp) => {
      this.totalData = resp;
      this.lastId = resp[resp.length - 1].id;
    });
  }
}
