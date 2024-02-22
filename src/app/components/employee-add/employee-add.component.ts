import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { DepartmentService } from 'src/app/services/department.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  dataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  registrationForm: FormGroup;
  isSuccess: boolean = false;
  id: number;
  data: any;
  update: boolean = false;
  constructor(
    private router: Router,
    private service: EmployeeService,
    private formBuilder: FormBuilder,
    private compService: CompanyService
    ,private depService:DepartmentService
  ) {}
  ngOnInit(): void {
    this.setEditedData();
    this.getLastId();
    this.getCompany();
    this.getDeptByCompanyName();
    this.registrationForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      status: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      company: ['', Validators.required],
      deptName:['', Validators.required],
      position:['', Validators.required],
      level:['', Validators.required],
      
      education: ['', Validators.required],
      employmentDate:['', Validators.required],
      dob: ['', Validators.required],
    });
  }
  departments:any;
  getDeptByCompanyName(){
    this.depService.getDepartment().subscribe((resp)=>{
      this.departments = resp;
    })
  }
  reset() {
    this.registrationForm.reset();
  }
  setEditedData() {
    this.id = parseInt(sessionStorage.getItem('EmployeeId'));
    sessionStorage.removeItem('EmployeeId');

    if (this.id) {
      this.update = true;
      this.service.getEmployeeById(this.id).subscribe((resp) => {
        this.data = resp;
          console.log(this.data);
        this.registrationForm.controls['fname'].setValue(this.data.firstName);
        this.registrationForm.controls['lname'].setValue(this.data.lastName);
        this.registrationForm.controls['email'].setValue(this.data.email);
        this.registrationForm.controls['phone'].setValue(this.data.phone);
        this.registrationForm.controls['address'].setValue(this.data.address);
        this.registrationForm.controls['deptName'].setValue(this.data.deptName);
        this.registrationForm.controls['position'].setValue(this.data.position);
        this.registrationForm.controls['status'].setValue(this.data.status);
        this.registrationForm.controls['education'].setValue(this.data.education);
        this.registrationForm.controls['level'].setValue(this.data.level);
        this.registrationForm.controls['company'].setValue(this.data.company);
      
        this.registrationForm.controls['employmentDate'].setValue(this.data.employmentDate);
        this.registrationForm.controls['dob'].setValue(this.data.dateOfBirth);
                
      });
    }
  }
  updateInfo() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value.name);
      const data: Employee = {
        id: this.id,
        firstName: this.registrationForm.value.fname,
        email: this.registrationForm.value.email,
        education: this.registrationForm.value.education,
        dateOfBirth: this.registrationForm.value.dob,
        phone: this.registrationForm.value.phone,
        status: this.registrationForm.value.status,
        lastName: this.registrationForm.value.lname,
        address: this.registrationForm.value.address,
        company:this.registrationForm.value.company,
                
        deptName:this.registrationForm.value.deptName,
        position:this.registrationForm.value.position,
        employmentDate:this.registrationForm.value.employmentDate,
         level:this.registrationForm.value.level,
        
      };
      this.service.updateEmployee(data, this.id).subscribe((resp) => {
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
      const data: Employee = {
        id: this.lastId,
        firstName: this.registrationForm.value.fname,
        email: this.registrationForm.value.email,
        education: this.registrationForm.value.education,
        dateOfBirth: this.registrationForm.value.dob,
        phone: this.registrationForm.value.phone,
        status: this.registrationForm.value.status,
        lastName: this.registrationForm.value.lname,
        address: this.registrationForm.value.address,
        company:this.registrationForm.value.company,
                
        deptName:this.registrationForm.value.deptName,
        position:this.registrationForm.value.position,
        employmentDate:this.registrationForm.value.employmentDate,
        level:this.registrationForm.value.level,
      };
      this.service.createEmployee(data).subscribe((resp) => {
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
    
    console.log(this.companyName);
  }
  lastId: any;
  totalData: any;
  getLastId() {
    // Id Auto Increment
    this.service.getEmployee().subscribe((resp) => {
      this.totalData = resp;
      this.lastId = resp[resp.length - 1].id;
    });
  }
}
